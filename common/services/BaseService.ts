import { Injectable, Inject } from '@nestjs/common';
import UtilService from '../services/UtilService';
import ReflectionService from '../services/ReflectionService';
import TraceService from './TraceService';

@Injectable()
export default abstract class BaseService {
    @Inject()
    private _utilService: UtilService;

    @Inject()
    protected _reflectionService: ReflectionService;

    @Inject()
    protected readonly _traceService: TraceService;

    abstract getDtoClass(): Function; 

    protected toDto(source: any) {               
        return this._utilService.createObjectFrom(this.getDtoClass(), source);
    }

    protected _name() {
        return this._reflectionService.name(this);
    }
}