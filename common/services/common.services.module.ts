import { Module } from '@nestjs/common';

import UtilService from './UtilService';

@Module({
    providers: [
        UtilService
    ],
    exports: [
        UtilService
    ]
})
export default class CommonServicesModule { }