import { Injectable, Inject } from '@nestjs/common';
import * as objectPath from 'object-path';
import UtilService from './UtilService';

@Injectable()
export default class ConfigService {

    private readonly _config: any;
    private readonly _cacheValue = {};

    @Inject()
    private readonly _utilService: UtilService;

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

    get publicKey(): string {
        const value = this._config.jwt.key.public;
        return this._utilService.decodeBase64(value);
    }

    get privateKey(): string {
        const value = this._config.jwt.key.private;
        return this._utilService.decodeBase64(value);
    }

    getValue(key: string) {
        if (this._cacheValue[key] === undefined){
            this._cacheValue[key] = objectPath.get(this._config, key);
        }
        return this._cacheValue[key];
    }
}