import { Injectable } from '@nestjs/common';
import * as objectPath from 'object-path';
import ServiceConfigDto from './dto/ServiceConfigDto';
import DatabaseConfigDto from './dto/DatabaseConfigDto';

@Injectable()
export default class ConfigService {

    private readonly _config: any;
    private readonly _cacheValue = {};

    constructor(config: object) {
        this._config = config;
    }

    get service(): ServiceConfigDto {
        return {
            name: this._config.service.name,
            port: this._config.service.port,
            requestTimeout: this._config.service.requestTimeout
        };
    }

    get database():DatabaseConfigDto {
        const dbConfig = this._config.database;
        return {
            host: dbConfig.host,
            database: dbConfig.db,
            username: dbConfig.username,
            password: dbConfig.password
        };
    }

    getValue(key: string) {
        if (this._cacheValue[key] === undefined) {
            this._cacheValue[key] = objectPath.get(this._config, key);
        }
        return this._cacheValue[key];
    }
}