import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as _ from 'underscore';
import * as objectPath from 'object-path';
import UtilService from './UtilService';

@Injectable()
export default class ConfigService {

    private readonly _config: any;
    private readonly _cacheValue = {};

    constructor(private readonly _utilService: UtilService, files: string[]) {
        let mergeConfig: any = {};
        files.forEach(file => {
            const fileContent = fs.readFileSync(file).toString();
            const content = this._utilService.toObject(fileContent);
            mergeConfig = Object.assign(mergeConfig, content);
        });
        this._config = mergeConfig;
    }

    async getPort(): Promise<number> {
        const value = await this._convertValue(this._config.port);
        return parseInt(value, 10);
    }

    get dbHost(): string {
        return this._convertValue(this._config.database.host);
    }

    get dbName(): string {
        return this._convertValue(this._config.database.db);
    }

    get publicKey(): string {
        const value = this._convertValue(this._config.jwt.key.public);
        return this._utilService.decodeBase64(value);
    }

    get privateKey(): string {
        const value = this._convertValue(this._config.jwt.key.private);
        return this._utilService.decodeBase64(value);
    }

    getValue(key: string) {
        if (this._cacheValue[key] === undefined){
            this._cacheValue[key] = objectPath.get(this._config, key);
        }
        return this._convertValue(this._cacheValue[key]);
    }

    protected async _convertValue(value): Promise<any> {
        //hooks for later transformation
        return value;
    }
}