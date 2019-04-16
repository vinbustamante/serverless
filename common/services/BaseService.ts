import { Injectable, Inject } from '@nestjs/common';
import UtilService from '../services/UtilService';

@Injectable()
export default abstract class BaseService {
    @Inject()
    private _utilService: UtilService;

    abstract getDtoClass(): Function; 

    protected toDto(source: any) {               
        return this._utilService.createObjectFrom(this.getDtoClass(), source);
    }
}