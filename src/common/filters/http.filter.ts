import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, HttpException } from "@nestjs/common";
import { Response } from "express";
import { ZodError } from "zod";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()

        let status = HttpStatus.INTERNAL_SERVER_ERROR
        let message = 'Internal Server Error'
        let errors: any = null

        if (exception instanceof HttpException) {
            status = exception.getStatus()
            const exceptionResponse = exception.getResponse()

            if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
                message = (exceptionResponse as any).message || message
                errors = (exceptionResponse as any).errors || null
            } else {
                message = exceptionResponse as string
            }
        } else if (exception instanceof ZodError) {
            status = HttpStatus.BAD_REQUEST
            message = 'Validation Failed'
            errors = exception.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message,
            }))
        }

        response.status(status).json({
            statusCode: status,
            message,
            errors,
            timestamp: new Date().toISOString(),
            path: ctx.getRequest().url
        })
    }
}