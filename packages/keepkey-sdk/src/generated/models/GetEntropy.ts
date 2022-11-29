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
 * @interface GetEntropy
 */
export interface GetEntropy {
    /**
     * 
     * @type {number}
     * @memberof GetEntropy
     */
    size: number;
}

/**
 * Check if a given object implements the GetEntropy interface.
 */
export function instanceOfGetEntropy(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "size" in value;

    return isInstance;
}

export function GetEntropyFromJSON(json: any): GetEntropy {
    return GetEntropyFromJSONTyped(json, false);
}

export function GetEntropyFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetEntropy {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'size': json['size'],
    };
}

export function GetEntropyToJSON(value?: GetEntropy | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'size': value.size,
    };
}

