import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import schemaMapping from './schemas/mapping';
import CommonServicesModule from '../../../../../common/services/common.services.module';

// repositories
import ApplicationRepository from './ApplicationRepository';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/local-sats-authentication', { useNewUrlParser: true }),
        MongooseModule.forFeature(schemaMapping),
        CommonServicesModule
    ],
    providers: [
        ApplicationRepository
    ],
    exports: [
        ApplicationRepository
    ]
})
export default class AuthenticationRepositoriesModule { }