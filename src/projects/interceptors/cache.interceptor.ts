import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable,of } from "rxjs";

export class CacheInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext,next: CallHandler): Observable<any>{
        const isCached = true;
        if(isCached){
            return of([]);
        }
        return next.handle();
    }
}