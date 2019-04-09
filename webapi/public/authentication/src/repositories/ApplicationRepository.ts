import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import MongoDbRepositoryBase from '../../../../../common/repositories/MongoDbRepositoryBase';
import ApplicationModel from './models/ApplicationModel';

@Injectable()
export default class ApplicationRepository extends MongoDbRepositoryBase<ApplicationModel> {

    getModelClass(): Function {
        return ApplicationModel;
    }

    getDbSchema(): mongoose.Schema {
        return new mongoose.Schema({
            _id : {
                type: String,
                required: true
            },
            clientId: {
                type: String,
                required: true
            },
            clientSecret: {
                type: String,
                required: true
            },           
            isEnabled: {
                type: Boolean,
                required: true
            }
        });
    }
    
    getById(clientId: string): Promise<ApplicationModel> {
        return super.findOne({clientId: clientId});
    }
}