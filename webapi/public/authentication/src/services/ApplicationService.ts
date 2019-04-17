import { Injectable, Inject } from '@nestjs/common';
import BaseService from '../../../../../common/services/BaseService';
import ApplicationRepository from '../repositories/ApplicationRepository';
import ApplicationDto from './dto/ApplicationDto';

@Injectable()
export default class ApplicationService extends BaseService {

    @Inject()
    private _applicationRepository: ApplicationRepository;

    getDtoClass(): Function {
        return ApplicationDto;
    }

    async getById(clientId: string): Promise<ApplicationDto> {       
        const applicationModel = await this._applicationRepository.getById(clientId);
        return this.toDto(applicationModel);
    }
}