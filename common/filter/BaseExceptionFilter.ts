import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import * as express from 'express';
import ServiceException from '../services/exception/ServiceException';
import RepositoryException from '../repositories/exception/RepositoryException';

export default class BaseExceptionFilter {

    response(exception: any, host: ArgumentsHost, message?: string, status?: number) {
        const context = host.switchToHttp();
        const response = context.getResponse<express.Response>();
        status = status || (exception.getStatus && exception.getStatus()) || HttpStatus.INTERNAL_SERVER_ERROR;
        if (!message && exception instanceof ServiceException) {
            message = exception.message;
        } else if (!message && exception instanceof RepositoryException) {
            //db error is risky since it has a potential to link credential
            message = 'Internal server error encountered';
        }
        response
            .status(status)
            .json({
                status: status,
                message: message
            });
    }

}