import { Injectable, Inject } from '@nestjs/common';
import * as _ from 'underscore';
import FileService from './FileService';
import FlowService from './FlowService';
import UtilService from './UtilService';

@Injectable()
export default class JsonFileConfigMergeService {

    @Inject()
    private readonly _fileService: FileService;

    @Inject()
    private readonly _flowService: FlowService;

    @Inject()
    private readonly _utilService: UtilService;    

    async merge(files: string[]): Promise<object> {
        let mergeConfig: any = {};
        const contents = await this._readFiles(files);
        contents.forEach(content => {
            const config = this._utilService.toObject(content);
            mergeConfig = Object.assign(mergeConfig, config);
        });
        return mergeConfig;
    }

    private _readFiles(files: string[]): Promise<string[]> {
        const readFile = this._fileService.read.bind(this._fileService);
        return this._flowService.each(files, readFile);
    }
}