import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import BaseExceptionFilter from './BaseExceptionFilter';

@Catch()
export default class AllExceptionFilter extends BaseExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    super.response(exception, host);
  }
}