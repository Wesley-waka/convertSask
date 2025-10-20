import { Controller, Get, HttpCode,Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(204)
  @Header('Cache-control','no-control')
  getHello(): string {
    return this.appService.getHello();
  }
}
