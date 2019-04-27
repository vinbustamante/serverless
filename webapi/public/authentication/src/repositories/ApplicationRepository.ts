import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import MongoDbRepositoryBase from '../../../../../common/repositories/MongoDbRepositoryBase';
import { InjectModel } from '@nestjs/mongoose';
import tableNames from './schemas/tableNames';
import ApplicationModel from './models/ApplicationModel';

@Injectable()
export default class ApplicationRepository extends MongoDbRepositoryBase {

    @InjectModel(tableNames.application)
    private _applicationModel: mongoose.Model<mongoose.Document>;

    getDb(): mongoose.Model<mongoose.Document> {
        return this._applicationModel;
    }

    getModelClass(): Function {
        return ApplicationModel;
    }

    getById(clientId: string, parentContext?): Promise<any> {
        return super.findOne({clientId: clientId}, parentContext);
        // const self = this;
        // const id = this._reflectionService.name(this);
        // return this._traceService.trace(id, async (span) => {
        //     const applicationModel = await self.findOne({clientId: clientId});
        //     span.finish();
        //     return applicationModel;
        // }, parentContext);
    }
}