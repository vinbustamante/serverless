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

    async getById(clientId: string, parentContext?: any): Promise<ApplicationDto> {
        // const applicationModel = await this._applicationRepository.getById(clientId);
        // return this.toDto(applicationModel);
        const id = this._reflectionService.name(this) + '/getById';
        return this._traceService.trace(id, async (span) => {
            const applicationModel = await this._applicationRepository.getById(clientId, span);
            const dto = this.toDto(applicationModel);
            span.finish();
            return dto;
        }, parentContext);
    }
}