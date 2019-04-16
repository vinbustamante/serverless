import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import RepositoryBase from '../../../../../common/repositories/RepositoryBase';
import { InjectModel } from '@nestjs/mongoose';
import tableNames from './schemas/tableNames';
import ApplicationModel from './models/ApplicationModel';

@Injectable()
export default class ApplicationRepository extends RepositoryBase {

    @InjectModel(tableNames.application)
    private _applicationModel: mongoose.Model<mongoose.Document>;

    getModelClass(): Function {
        return ApplicationModel;
    }

    async getById(clientId: string): Promise<any> {
        const application = await this._applicationModel.findOne({ clientId: clientId }).exec();
        return this.toModel(application);
    }
}