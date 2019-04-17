import { Module } from '@nestjs/common';
import UtilService from './UtilService';
import LogService from './LogService';
import ConfigService from './ConfigService';
import * as path from 'path';

@Module({
    providers: [
        UtilService,
        LogService,
        {
            provide: ConfigService,
            inject: [UtilService],
            useFactory: (utilService) => {
                const pwd = process.cwd();
                const files = [
                    path.join(pwd,'config', 'default.json'),
                    path.join(pwd, 'config', `${process.env.NODE_ENV || 'dev'}.json`)
                ];
                const configService: any = new ConfigService(utilService, files);
                return configService;
            }
        }
    ],
    exports: [
        ConfigService,
        UtilService,
        LogService
    ]
})
export default class CommonServicesModule { }