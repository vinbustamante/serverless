import MetaDataKey from '../enum/MetaDataKey';
import { Injectable, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as _ from 'underscore';

@Injectable()
export default class ReflectionService {

    @Inject()
    private readonly _reflector: Reflector;

    objectToConstructor(instance): Function {
        if (_.isFunction(instance)) {
            return instance;
        } else {
            return instance.constructor;
        }
    }

    name(value: any): string {
        const klass = this.objectToConstructor(value)
        const klassName = this._reflector.get<string>(MetaDataKey.name, klass) || klass.name;
        return klassName;
    }

    // funcName(func) {
    //     func = func || this.funcName.caller.name;
    //     return func.name;
    // }
}