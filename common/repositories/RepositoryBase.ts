import * as _ from 'underscore';
import { Injectable, Inject } from '@nestjs/common';
import UtilService from '../services/UtilService';

@Injectable()
export default abstract class RepositoryBase {

    @Inject()
    private _utilService: UtilService;

    abstract getModelClass(): Function;

    protected toModel(source: any) {
        return this._utilService.createObjectFrom(this.getModelClass(), source);
    }
}