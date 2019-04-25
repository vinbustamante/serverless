import { Module } from '@nestjs/common';
import * as path from 'path';
import UtilService from './UtilService';
import LogService from './LogService';
import ConfigService from './ConfigService';
import FileService from './FileService';
import FlowService from './FlowService';
import JsonFileConfigMergeService from './JsonFileConfigMergeService';
import DateService from './DateService';
import AuditService from './AuditService';
import TraceService from './TraceService';
import ReflectionService from './ReflectionService';


@Module({
    providers: [
        UtilService,
        LogService,
        {
            provide: ConfigService,
            inject: [JsonFileConfigMergeService, UtilService],
            useFactory: async (jsonConfigMergeService: JsonFileConfigMergeService, utilService: UtilService) => {
                const pwd = process.cwd();
                const files = [
                    path.join(pwd,'config', 'default.json'),
                    path.join(pwd, 'config', `${process.env.NODE_ENV || 'dev'}.json`)
                ];
                const config = await jsonConfigMergeService.merge(files);
                const configService: any = new ConfigService(config);
                configService._utilService = utilService;
                return configService;
            }
        },
        FileService,
        FlowService,
        JsonFileConfigMergeService,
        DateService,
        AuditService,
        TraceService,
        ReflectionService
    ],
    exports: [
        ConfigService,
        UtilService,
        LogService,
        FileService,
        FlowService,
        JsonFileConfigMergeService,
        DateService,
        AuditService,
        TraceService,
        ReflectionService
    ]
})
export default class CommonServicesModule { }