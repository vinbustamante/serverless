import 'reflect-metadata';
import * as _ from 'underscore';
import { Injectable, Inject } from '@nestjs/common';
import UtilService from './UtilService';
import LogService from './LogService';
import MetaDataKey from '../enum/MetaDataKey';

@Injectable()
export default class AuditService {

    @Inject()
    private readonly _utilService: UtilService;

    @Inject()
    private readonly _logService: LogService;

    removeExclussion(auditInfo: any) {
        let record: any;
        if (auditInfo && this.isClassExcluded(auditInfo) === false) {
            record = {};
            const self = this;
            Object.keys(auditInfo)
                .forEach(prop => {
                    if (_.isObject(auditInfo[prop]) || _.isFunction(auditInfo[prop])) {
                        record[prop] = self.removeExclussion(auditInfo[prop]);
                    } else {
                        if (self.isPropertyExcluded(auditInfo, prop) === false) {
                            record[prop] = auditInfo[prop];
                        }
                    }
                });
        }
        return record;
    }

    isClassExcluded(instance): boolean {
        const klass = this._utilService.objectToConstructor(instance);
        return Reflect.getMetadata(MetaDataKey.excludeForAudit, klass) === true;
    }

    isPropertyExcluded(instance, property): boolean {
        const klass = this._utilService.objectToConstructor(instance);
        return Reflect.getMetadata(MetaDataKey.excludeForAudit, klass, property) === true;
    }

    async record(info): Promise<any> {
        if (info) {
            info = this.removeExclussion(info);
            this._logService.info(info);
        }
    }
}