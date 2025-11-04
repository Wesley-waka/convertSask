import { Controller, Get, HttpCode,Header } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { UseInterceptors } from '@nestjs/common';

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(204)
  @Header('Cache-control','no-control')
  getHello(): string {
    return this.appService.getHello();
  }

  @CacheKey('custom_key')
  @CacheTTL(20)
  findAll(): string[]{
    return [];
  }
}
