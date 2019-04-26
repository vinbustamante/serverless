import { Injectable, Inject } from '@nestjs/common';
import UtilService from '../services/UtilService';
import ReflectionService from '../services/ReflectionService';

@Injectable()
export default abstract class BaseService {
    @Inject()
    private _utilService: UtilService;

    @Inject()
    private _reflectionService: ReflectionService;

    abstract getDtoClass(): Function; 

    protected toDto(source: any) {               
        return this._utilService.createObjectFrom(this.getDtoClass(), source);
    }

    protected _name() {
        return this._reflectionService.name(this);
    }
}