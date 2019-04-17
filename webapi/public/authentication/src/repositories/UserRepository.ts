import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import MongoDbRepositoryBase from '../../../../../common/repositories/MongoDbRepositoryBase';
import { InjectModel } from '@nestjs/mongoose';
import tableNames from './schemas/tableNames';
import UserModel from './models/UserModel';

@Injectable()
export default class UserRepository extends MongoDbRepositoryBase  {

    @InjectModel(tableNames.user)
    private _userModel: mongoose.Model<mongoose.Document>;

    getDb(): mongoose.Model<mongoose.Document> {
        return this._userModel;
    }

    getModelClass(): Function {
        return UserModel;
    }

    getByUsername(username: string): Promise<any> {
        return super.findOne({username: username});
    }
}