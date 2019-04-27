import * as _ from 'underscore';
import { Injectable, Inject } from '@nestjs/common';
import UtilService from '../services/UtilService';
import ReflectionService from '../services/ReflectionService';
import TraceService from '../services/TraceService';

@Injectable()
export default abstract class RepositoryBase {

    @Inject()
    protected _utilService: UtilService;

    @Inject()
    protected readonly _reflectionService: ReflectionService;

    @Inject()
    protected readonly _traceService: TraceService;

    abstract getModelClass(): Function;

    protected toModel(source: any) {
        return this._utilService.createObjectFrom(this.getModelClass(), source);
    }

    protected _name() {
        return this._reflectionService.name(this);
    }
}