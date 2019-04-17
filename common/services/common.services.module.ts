import { Module } from '@nestjs/common';
import UtilService from './UtilService';
import LogService from './LogService';

@Module({
    providers: [
        UtilService,
        LogService
    ],
    exports: [
        UtilService,
        LogService
    ]
})
export default class CommonServicesModule { }