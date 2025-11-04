import { CacheInterceptor, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable();

class HttpsCacheInterceptor extends CacheInterceptor{
    trackBy(context: ExecutionContext): string | undefined{
        return 'key';
    }
}