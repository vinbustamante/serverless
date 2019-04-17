import { Injectable } from '@nestjs/common';
import ApplicationService from '../ApplicationService';

@Injectable()
export default class ApplicationServiceCacheable extends ApplicationService {

    getById(clientId: string): Promise<any> {
        console.log('***************************');
        console.log('cache version');
        console.log('***************************');
        return super.getById(clientId);
    }

}