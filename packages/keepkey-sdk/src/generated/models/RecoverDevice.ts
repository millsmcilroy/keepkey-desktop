/* tslint:disable */
/* eslint-disable */
/**
 * keepkey-desktop
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.1.14
 * Contact: bithighlander@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface RecoverDevice
 */
export interface RecoverDevice {
    /**
     * Bits. Either 128 (12 words), 192 (18 words), or 256 (24 words)
     * @type {number}
     * @memberof RecoverDevice
     */
    entropy: RecoverDeviceEntropyEnum;
    /**
     * 
     * @type {string}
     * @memberof RecoverDevice
     */
    label: string;
    /**
     * 
     * @type {boolean}
     * @memberof RecoverDevice
     */
    passphrase: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof RecoverDevice
     */
    pin: boolean;
    /**
     * 
     * @type {string}
     * @memberof RecoverDevice
     */
    language?: string;
    /**
     * 
     * @type {number}
     * @memberof RecoverDevice
     */
    autoLockDelayMs?: number;
    /**
     * 
     * @type {number}
     * @memberof RecoverDevice
     */
    u2fCounter?: number;
}


/**
 * @export
 */
export const RecoverDeviceEntropyEnum = {
    NUMBER_128: 128,
    NUMBER_192: 192,
    NUMBER_256: 256
} as const;
export type RecoverDeviceEntropyEnum = typeof RecoverDeviceEntropyEnum[keyof typeof RecoverDeviceEntropyEnum];


/**
 * Check if a given object implements the RecoverDevice interface.
 */
export function instanceOfRecoverDevice(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "entropy" in value;
    isInstance = isInstance && "label" in value;
    isInstance = isInstance && "passphrase" in value;
    isInstance = isInstance && "pin" in value;

    return isInstance;
}

export function RecoverDeviceFromJSON(json: any): RecoverDevice {
    return RecoverDeviceFromJSONTyped(json, false);
}

export function RecoverDeviceFromJSONTyped(json: any, ignoreDiscriminator: boolean): RecoverDevice {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'entropy': json['entropy'],
        'label': json['label'],
        'passphrase': json['passphrase'],
        'pin': json['pin'],
        'language': !exists(json, 'language') ? undefined : json['language'],
        'autoLockDelayMs': !exists(json, 'autoLockDelayMs') ? undefined : json['autoLockDelayMs'],
        'u2fCounter': !exists(json, 'u2fCounter') ? undefined : json['u2fCounter'],
    };
}

export function RecoverDeviceToJSON(value?: RecoverDevice | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'entropy': value.entropy,
        'label': value.label,
        'passphrase': value.passphrase,
        'pin': value.pin,
        'language': value.language,
        'autoLockDelayMs': value.autoLockDelayMs,
        'u2fCounter': value.u2fCounter,
    };
}

