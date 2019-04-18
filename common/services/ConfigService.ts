import { Injectable } from '@nestjs/common';
import * as objectPath from 'object-path';

@Injectable()
export default class ConfigService {

    private readonly _config: any;
    private readonly _cacheValue = {};

    constructor(config: object) {
        this._config = config;
    }

    get port(): number {
        const value = this._config.port;
        return parseInt(value, 10);
    }

    get dbHost(): string {
        return this._config.database.host;
    }

    get dbName(): string {
        return this._config.database.db;
    }

    get requestTimeout(): number {
        return this._config.request.timeout;
    }

    getValue(key: string) {
        if (this._cacheValue[key] === undefined){
            this._cacheValue[key] = objectPath.get(this._config, key);
        }
        return this._cacheValue[key];
    }
}