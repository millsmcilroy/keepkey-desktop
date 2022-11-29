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
import type { RippleStdTx } from './RippleStdTx';
import {
    RippleStdTxFromJSON,
    RippleStdTxFromJSONTyped,
    RippleStdTxToJSON,
} from './RippleStdTx';

/**
 * 
 * @export
 * @interface RippleTx
 */
export interface RippleTx {
    /**
     * 
     * @type {string}
     * @memberof RippleTx
     */
    type: string;
    /**
     * 
     * @type {RippleStdTx}
     * @memberof RippleTx
     */
    value: RippleStdTx;
}

/**
 * Check if a given object implements the RippleTx interface.
 */
export function instanceOfRippleTx(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "value" in value;

    return isInstance;
}

export function RippleTxFromJSON(json: any): RippleTx {
    return RippleTxFromJSONTyped(json, false);
}

export function RippleTxFromJSONTyped(json: any, ignoreDiscriminator: boolean): RippleTx {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': json['type'],
        'value': RippleStdTxFromJSON(json['value']),
    };
}

export function RippleTxToJSON(value?: RippleTx | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'value': RippleStdTxToJSON(value.value),
    };
}

