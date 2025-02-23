import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ZodError } from 'zod';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json({
        statusCode: exception.getStatus(),
        errors: exception.getResponse(),
        timestamp: new Date().toISOString(),
      });
    } else if (exception instanceof ZodError) {
      response.status(400).json({
        statusCode: 400,
        errors: exception.errors.map((e) => e.message),
        timestamp: new Date().toISOString(),
      });
    } else {
      response.status(500).json({
        errors: exception.message,
      });
    }
  }
}
