import { SetMetadata } from '@nestjs/common';
import 'reflect-metadata';
import * as _ from 'underscore';
import MetaDataKey from '../enum/MetaDataKey';
import UtilService from '../services/UtilService';

export const excludeForAudit = () => {
    return (target: any, key?: any) => {
        const klass = objectToConstructor(target);
        if (klass) {
            if (key) {
                Reflect.defineMetadata(MetaDataKey.excludeForAudit, true, klass, key);
            } else {
                Reflect.defineMetadata(MetaDataKey.excludeForAudit, true, klass);
            }
        }
    }
}
export const excludeRequestBodyForAudit = () => SetMetadata(MetaDataKey.excludeRequestBodyForAudit, true);
export const excludeResponseBodyForAudit = () => SetMetadata(MetaDataKey.excludeResponseBodyForAudit, true);

let _utilService;
function objectToConstructor(target: any): string {
    if (_utilService === undefined) {
        _utilService = new UtilService();
    }
    return _utilService.objectToConstructor(target);
}