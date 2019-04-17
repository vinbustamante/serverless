import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as _ from 'underscore';
import UtilService from './UtilService';

@Injectable()
export default class ConfigService {

    private readonly _config: any;

    constructor(private readonly _utilService: UtilService, files: string[]) {
        let mergeConfig: any = {};
        files.forEach(file => {
            const fileContent = fs.readFileSync(file).toString();
            const content = this._utilService.toObject(fileContent);
            mergeConfig = Object.assign(mergeConfig, content);
        });
        this._config = mergeConfig;
    }

    get port(): number {
        return this._convertValue(this._config.port);
    }

    get dbHost(): string {
        return this._convertValue(this._config.database.host);
    }

    get dbName(): string {
        return this._convertValue(this._config.database.db);
    }

    protected _convertValue(value) {
        //hooks for later transformation
        return value;
    }
}