import * as _ from 'underscore';
import * as mongoose from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import RepositoryBase from './RepositoryBase';
import RepositoryException from './exception/RepositoryException';
import TraceService from '../services/TraceService';

@Injectable()
export default abstract class MongoDbRepositoryBase extends RepositoryBase {

    @Inject()
    private readonly _traceService: TraceService;

    abstract getDb(): mongoose.Model<mongoose.Document>;

    protected find(query: any) {
        // const db = this.getDb();
        // return db.find(query)
        //     .exec()
        //     .then(response => {
        //         return response.map(this.toModel.bind(this));
        //     })
        //     .catch(err => {                
        //         return Promise.reject(new RepositoryException(err));
        //     });
        const self = this;
        return this._traceService.trace(self._name(), (span: any) => {
            const db = self.getDb();
            return db.find(query)
                .exec()
                .then(response => {
                    const model = response.map(self.toModel.bind(self));
                    span.finish();
                    return model;
                })
                .catch(err => {
                    return Promise.reject(new RepositoryException(err));
                });
        });
    }

    protected findOne(query: any): Promise<any> {
        // const db = this.getDb();
        // return db.findOne(query)
        //     .exec()
        //     .then(response => {
        //         const model = this.toModel(response);                
        //         return model;
        //     })
        //     .catch(err => {                
        //         return Promise.reject(new RepositoryException(err));
        //     });
        const self = this;
        return this._traceService.trace(self._name(), (span: any) => {
            const db = this.getDb();
            return db.findOne(query)
                .exec()
                .then(response => {
                    const model = this.toModel(response);
                    span.finish();
                    return model;
                })
                .catch(err => {
                    return Promise.reject(new RepositoryException(err));
                });
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