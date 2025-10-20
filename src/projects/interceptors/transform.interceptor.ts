import { BadGatewayException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError, map, Observable, throwError } from "rxjs";

export interface Response<T>{
    data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T,Response<T>>{
    intercept(context: ExecutionContext,next: CallHandler): Observable<Response<T>>{
        return next.handle().pipe(
            map(data=>({data}))
        )
    }
}

@Injectable()
export class ExcludeNullInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext,next: CallHandler): Observable<any>{
        return next
            .handle()
            .pipe(map(value => value === null ? '': value));
    }
}

@Injectable()
export class ErrorsInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext,next: CallHandler): Observable<any>{
        return next
        .handle()
        .pipe(
            catchError(err=>throwError(()=>new BadGatewayException()))
        )
    }
}