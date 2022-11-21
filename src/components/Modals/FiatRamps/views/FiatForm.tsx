import type { Asset } from '@shapeshiftoss/asset-service'
import type { AccountId, AssetId } from '@shapeshiftoss/caip'
import { ethAssetId, fromAccountId } from '@shapeshiftoss/caip'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { getChainAdapterManager } from 'context/PluginProvider/chainAdapterSingleton'
import { useModal } from 'hooks/useModal/useModal'
import { useWallet } from 'hooks/useWallet/useWallet'
import type { ParseAddressInputReturn } from 'lib/address/address'
import { parseAddressInput } from 'lib/address/address'
import { logger } from 'lib/logger'
import type { PartialRecord } from 'lib/utils'
import { useGetFiatRampsQuery } from 'state/apis/fiatRamps/fiatRamps'
import { selectPortfolioAccountMetadata, selectWalletAccountIds } from 'state/slices/selectors'

import { FiatRampAction } from '../FiatRampsCommon'
import { Overview } from './Overview'

const moduleLogger = logger.child({
  namespace: ['Modals', 'FiatRamps', 'Views', 'Manager'],
})

type AddressesByAccountId = PartialRecord<AccountId, Partial<ParseAddressInputReturn>>

type FiatFormProps = {
  assetId: AssetId
  fiatRampAction: FiatRampAction
}

export const FiatForm: React.FC<FiatFormProps> = ({ assetId = ethAssetId, fiatRampAction }) => {
  const walletAccountIds = useSelector(selectWalletAccountIds)
  const portfolioAccountMetadata = useSelector(selectPortfolioAccountMetadata)
  const [accountId, setAccountId] = useState<AccountId | undefined>()
  const [addressByAccountId, setAddressByAccountId] = useState<AddressesByAccountId>()
  const [selectedAssetId, setSelectedAssetId] = useState<AssetId>()

  const {
    state: { wallet, isDemoWallet },
  } = useWallet()

  const { data: ramps } = useGetFiatRampsQuery()
  const { assetSearch } = useModal()

  const handleIsSelectingAsset = useCallback(
    (fiatRampAction: FiatRampAction) => {
      if (!wallet) return
      const assetIds =
        (fiatRampAction === FiatRampAction.Buy ? ramps?.buyAssetIds : ramps?.sellAssetIds) ?? []
      assetSearch.open({
        onClick: (asset: Asset) => setSelectedAssetId(asset.assetId),
        filterBy: (assets: Asset[]) => assets.filter(asset => assetIds.includes(asset.assetId)),
        disableUnsupported: true,
      })
    },
    [assetSearch, ramps?.buyAssetIds, ramps?.sellAssetIds, wallet],
  )

  /**
   * preload all addresses, and reverse resolved vanity addresses for all account ids
   */
  useEffect(() => {
    if (!wallet) return
    /**
     * important - don't even attempt to generate addresses for the demo wallet
     * we don't want users buying crypto into the demo wallet 🤦‍♂️
     */
    if (isDemoWallet) return
    ;(async () => {
      const plainAddressResults = await Promise.allSettled(
        walletAccountIds.map(accountId => {
          const accountMetadata = portfolioAccountMetadata[accountId]
          const { accountType, bip44Params } = accountMetadata
          moduleLogger.trace({ fn: 'getAddress' }, 'Getting Addresses...')
          const payload = { accountType, bip44Params, wallet }
          const { chainId } = fromAccountId(accountId)
          const maybeAdapter = getChainAdapterManager().get(chainId)
          if (!maybeAdapter) return Promise.resolve(`no chain adapter for ${chainId}`)
          return maybeAdapter.getAddress(payload)
        }),
      )
      const plainAddresses = plainAddressResults.reduce<(string | undefined)[]>((acc, result) => {
        if (result.status === 'rejected') {
          moduleLogger.error(result.reason, 'failed to get address')
          acc.push(undefined) // keep same length of accumulator
          return acc
        }
        acc.push(result.value)
        return acc
      }, [])

      const parsedAddressResults = await Promise.allSettled(
        plainAddresses.map((value, idx) => {
          if (!value) return Promise.resolve({ address: '', vanityAddress: '' })
          const { chainId } = fromAccountId(walletAccountIds[idx])
          return parseAddressInput({ chainId, value })
        }),
      )

      const addressesByAccountId = parsedAddressResults.reduce<AddressesByAccountId>(
        (acc, parsedAddressResult, idx) => {
          if (parsedAddressResult.status === 'rejected') return acc
          const accountId = walletAccountIds[idx]
          const { value } = parsedAddressResult
          acc[accountId] = value
          return acc
        },
        {},
      )

      setAddressByAccountId(addressesByAccountId)
    })()
  }, [isDemoWallet, walletAccountIds, portfolioAccountMetadata, wallet])

  const { address, vanityAddress } = useMemo(() => {
    const empty = { address: '', vanityAddress: '' }
    if (!addressByAccountId) return empty
    if (!accountId) return empty
    const address = addressByAccountId[accountId]?.address ?? ''
    const vanityAddress = addressByAccountId[accountId]?.vanityAddress ?? ''
    return { address, vanityAddress }
  }, [addressByAccountId, accountId])

  return (
    <Overview
      assetId={selectedAssetId ?? assetId}
      handleIsSelectingAsset={handleIsSelectingAsset}
      defaultAction={fiatRampAction}
      address={address}
      vanityAddress={vanityAddress}
      handleAccountIdChange={setAccountId}
      accountId={accountId}
    />
  )
}