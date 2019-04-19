import * as _ from 'underscore';
import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import RepositoryBase from './RepositoryBase';
import RepositoryException from './exception/RepositoryException';

@Injectable()
export default abstract class MongoDbRepositoryBase extends RepositoryBase {

    abstract getDb(): mongoose.Model<mongoose.Document>;

    protected async find(query: any) {
        const db = this.getDb();
        return db.find(query)
            .exec()
            .then(response => {
                return response.map(this.toModel.bind(this));
            })
            .catch(err => {                
                return Promise.reject(new RepositoryException(err));
            });
    }

    protected findOne(query: any): Promise<any> {       
        const db = this.getDb();
        return db.findOne(query)
            .exec()
            .then(response => {
                const model = this.toModel(response);                
                return model;
            })
            .catch(err => {                
                return Promise.reject(new RepositoryException(err));
            });
    }
    
    protected toModel(source: any) {
        if (_.isObject(source) && source.toObject) {           
            source = source.toObject();
        }
        if (source._id !== undefined) {
            let id;
            if (_.isObject(source._id)) {
                id = source._id.toString();
            } else {
                id = source._id;
            }
            delete source._id;
            source.id = id;
        }
        return super.toModel(source);
    }
}