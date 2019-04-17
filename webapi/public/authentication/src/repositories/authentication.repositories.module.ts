import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import schemaMapping from './schemas/mapping';
import CommonServicesModule from '../../../../../common/services/common.services.module';
import ConfigService from '../../../../../common/services/ConfigService';

// repositories
import ApplicationRepository from './ApplicationRepository';
import UserRepository from './UserRepository';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ CommonServicesModule ],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => {
                const host = config.dbHost;
                const dbName = config.dbName;
                return {
                    uri: 'mongodb://' + host + '/' + dbName,
                    useNewUrlParser: true
                };
            }
        }),
        MongooseModule.forFeature(schemaMapping),
        CommonServicesModule
    ],
    providers: [
        ApplicationRepository,
        UserRepository
    ],
    exports: [
        ApplicationRepository,
        UserRepository
    ]
})
export default class AuthenticationRepositoriesModule { }