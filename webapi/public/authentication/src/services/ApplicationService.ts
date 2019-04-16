import { Injectable, Inject } from '@nestjs/common';
import ApplicationRepository from '../repositories/ApplicationRepository';

@Injectable()
export default class ApplicationService {

    @Inject()
    private _applicationRepository: ApplicationRepository;

    getById(clientId: string): Promise<any> {
        return this._applicationRepository.getById(clientId);
    }
}