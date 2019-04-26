import { Injectable, Inject } from '@nestjs/common';
import BaseService from '../../../../../common/services/BaseService';
// import TraceService from '../../../../../common/services/TraceService';
import ApplicationRepository from '../repositories/ApplicationRepository';
import ApplicationDto from './dto/ApplicationDto';

@Injectable()
export default class ApplicationService extends BaseService {

    @Inject()
    private _applicationRepository: ApplicationRepository;

    // @Inject()
    // private readonly _traceService: TraceService;

    getDtoClass(): Function {
        return ApplicationDto;
    }

    async getById(clientId: string): Promise<ApplicationDto> {
        const applicationModel = await this._applicationRepository.getById(clientId);
        return this.toDto(applicationModel);
        // return this._traceService.trace(this._name(), async (span) => {
        //     const applicationModel = await this._applicationRepository.getById(clientId);
        //     const dto = this.toDto(applicationModel);
        //     span.finish();
        //     return dto;
        // });
    }
}