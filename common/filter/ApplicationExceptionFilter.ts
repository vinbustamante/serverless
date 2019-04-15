import { ExceptionFilter, Catch, ArgumentsHost, HttpException, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import ApplicationException from '../exception/ApplicationException';

@Catch(ApplicationException)
export default class ApplicationExceptionFilter implements ExceptionFilter {
  catch(exception: ApplicationException, host: ArgumentsHost) {
      console.log('***************************');
      console.log('ApplicationExceptionFilter');
      console.log('***************************');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // let status = exception.getStatus && exception.getStatus();
    // if (!status) {
    //   status = HttpStatus.INTERNAL_SERVER_ERROR;
    // }
    let status = 400;
    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}