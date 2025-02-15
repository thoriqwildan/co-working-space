import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data) => {
                const message = data?.msg || 'Request Berhasil'

                if (data?.msg) {
                    delete data.msg
                }

                return {
                    status: 'success',
                    message,
                    data,
                    timestamp: new Date().toISOString(),
                }
            })
        )
    }
}