import * as _ from 'underscore';
import { Injectable, Inject } from '@nestjs/common';
import UtilService from '../services/UtilService';
import ReflectionService from '../services/ReflectionService';

@Injectable()
export default abstract class RepositoryBase {

    @Inject()
    private _utilService: UtilService;

    @Inject()
    private readonly _reflectionService: ReflectionService;    

    abstract getModelClass(): Function;

    protected toModel(source: any) {
        return this._utilService.createObjectFrom(this.getModelClass(), source);
    }

    protected _name() {
        return this._reflectionService.name(this);
    }
}