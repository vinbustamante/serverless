import { Injectable, Inject } from '@nestjs/common';
import * as mongoose from 'mongoose';
//import repositoryTypes from './repositoryTypes';
import UtilService from '../services/UtilService';

@Injectable()
export default abstract class MongoDbRepositoryBase<TModel> {

    //@Inject(repositoryTypes.mongoDbConnection)
    private _dbConnection: mongoose.Connection;

    @Inject()
    private _utilService: UtilService;

    private _dbSchemaModel: any;

    //note: due to type lack of runtime lost of metadata let's make this explicit
    abstract getModelClass(): Function;
    abstract getDbSchema(): mongoose.Schema;

    protected find(criteria: any): Promise<TModel[]> {
        return new Promise((resolve, reject) => {
            let schemaModel = this._getSchemaModel();
            schemaModel.find(criteria, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    let models: TModel[] = [];
                    if (results) {                        
                        models = results.map(dbModel => {
                            let model = this._utilService.createObjectFrom(this.getModelClass(), dbModel.toObject());
                            return model;
                        });
                    }
                    resolve(models);
                }
            });
        });
    }

    async findOne(criteria: any, sortCriteria?: any): Promise<any> {       
        return new Promise((resolve, reject) => {
            let schemaModel = this._getSchemaModel();
            let query = schemaModel.findOne(criteria);
            if (sortCriteria) {
                query = query.sort(sortCriteria);
            }
            query.exec((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    let model: TModel;
                    if (result) {
                        model = this._utilService.createObjectFrom(this.getModelClass(), result.toObject());
                    }
                    resolve(model);
                }
            });
        });
    }

    // protected async dbSave(record: TModel): Promise<TModel> {
    //     if (record) {
    //         let ModelClass = this._getSchemaModel();
    //         let dbModel = new ModelClass();
    //         let mapFields = this._utilService.getMapFields(this.getModelClass());
    //         mapFields.forEach(field => {
    //             dbModel[field.sourceField] = record[field.destinationField];
    //         });
    //         if (dbModel._id) {
    //             await ModelClass.findOneAndUpdate({_id: dbModel._id}, dbModel, {upsert:true});
    //         } else {
    //             dbModel._id = uuidv1();
    //             record['id'] = dbModel._id;
    //             await dbModel.save();
    //         }            
    //     }
    //     return record;
    // }

    private _getSchemaModel(): any {
        if (this._dbSchemaModel === undefined) {
            let modelClass = this.getModelClass();
            this._dbSchemaModel = this._dbConnection.model(modelClass.name, this.getDbSchema(), this._getTableName());
        }
        return this._dbSchemaModel;
    }

    private _getTableName(): string {
        return this._utilService.getTablename(this.getModelClass());
    }
}