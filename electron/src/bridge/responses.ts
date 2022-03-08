export interface GenericResponse {
    success: boolean
}

export interface Status {
    success: boolean,
    status: string,
    state: number
}

export interface SignedTx {
    success: boolean,
    status: string,
    signedTx: any
}

//PairResponse
export interface PairResponse {
    success: boolean,
    reason: string
}

export interface PairBody {
    serviceName: string,
    serviceImageUrl: string
}

export interface Pubkey {
    pubkey: string
    caip: string
}

export interface User {
    online: boolean,
    accounts: any,
    balances: any
}

export interface Read {
    data: string
}

export interface Write {
    output: string
}

export interface WriteBody {
    data: any
}

export interface Error {
    success: boolean
    reason: string
}
