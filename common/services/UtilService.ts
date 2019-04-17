const crypto = require('crypto');
import { Injectable, Inject } from '@nestjs/common';
import * as _ from 'underscore';
import { plainToClass } from "class-transformer";
import { Reflector } from '@nestjs/core';
import commonConstant from '../commonConstant';

@Injectable()
export default class UtilService {

    private _decodedValue: any = {};

    @Inject()
    private _reflector: Reflector;

    toJson(value: any): any {
        let converted: any = value;
        if (value && typeof value === 'object' ) {
            converted = JSON.stringify(value)
        }
        return converted;
    }

    toObject(value: any): any {
        let converted: any = value;
        if (_.isString(value) && value.length > 0) {
            try {
                converted = JSON.parse(value);
            } catch(err) {               
                converted = {};
            }
        }
        return converted;
    }

    isHttpAddress(address: string): boolean {
        let isHttp = false;
        if (address && address.length > 0) {
            isHttp = address.indexOf('http://') === 0 || address.indexOf('https://') === 0;
        }
        return isHttp;
    }

    createHash(data: any, algorithm: string = "md5"): string {
        let json = this.toJson(data);
        return crypto.createHash(algorithm).update(json).digest('hex');
    }

    createObjectFrom(klass:any, objectSource: object): any {
        let model: any;
        if (klass && objectSource) {
            model = plainToClass(klass, objectSource);
        }
        return model;
    }

    getTablename(modelClass: any): string {
        let tableName: string = this._reflector.get(commonConstant.TableName, modelClass);
        return tableName;
    }

    decodeBase64(value: string): string {
        let decodedValue: string;
        if (value) {
            decodedValue = this._decodedValue[value];            
            if(!decodedValue) {
                let buffer = new Buffer(value, 'base64');
                decodedValue = buffer.toString('ascii');
                this._decodedValue[value] = decodedValue;
            }
        }
        return decodedValue;
    }
}