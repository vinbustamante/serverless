import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import MongoDbRepositoryBase from '../../../../../common/repositories/MongoDbRepositoryBase';
import { InjectModel } from '@nestjs/mongoose';
import tableNames from './schemas/tableNames';
import UserModel from './models/UserModel';

@Injectable()
export default class UserRepository extends MongoDbRepositoryBase {

    @InjectModel(tableNames.user)
    private _userModel: mongoose.Model<mongoose.Document>;

    getDb(): mongoose.Model<mongoose.Document> {
        return this._userModel;
    }

    getModelClass(): Function {
        return UserModel;
    }

    getByUsername(username: string, parentContext?: any): Promise<any> {
        return super.findOne({username: username}, parentContext);
        // const self = this;
        // const id = this._reflectionService.name(this);
        // return this._traceService.trace(id, async (span) => {
        //     const userModel = await self.findOne({ username: username });
        //     span.finish();
        //     return userModel;
        // }, parentContext);
    }
}