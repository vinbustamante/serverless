import { ArgumentsHost, HttpStatus, Inject, UnauthorizedException } from '@nestjs/common';
import * as express from 'express';
import ServiceException from '../services/exception/ServiceException';
import RepositoryException from '../repositories/exception/RepositoryException';
import LogService from '../services/LogService';
import { TimeoutError } from 'rxjs';

export default class BaseExceptionFilter {

    @Inject()
    private _logService: LogService;

    response(exception: any, host: ArgumentsHost, message?: string, status?: number) {
        const context = host.switchToHttp();
        const response = context.getResponse<express.Response>();
        status = status || (exception.getStatus && exception.getStatus()) || HttpStatus.INTERNAL_SERVER_ERROR;
        if (!message && exception instanceof ServiceException) {
            message = exception.message;
        } else if (!message && exception instanceof RepositoryException) {
            //db error is risky since it has a potential to link credential
            message = 'Internal server error encountered';
        } else if(exception instanceof TimeoutError) {
            status = 408;
            message = 'Request timeout';
        } else if(exception instanceof UnauthorizedException) {
            message = exception.message || 'access denied';
        }
        this._logService.error(exception);

        response
            .status(status)
            .json({
                message: message
            });
    }

}