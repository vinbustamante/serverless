import { ExceptionFilter, Catch, ArgumentsHost, HttpException, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import BaseExceptionFilter from './BaseExceptionFilter';

@Catch()
export default class AllExceptionFilter extends BaseExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    super.response(exception, host);
  }
}