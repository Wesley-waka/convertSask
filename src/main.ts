import { HttpAdapterHost, LazyModuleLoader, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './projects/all-exception.filter';
import { HttpException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const {httpAdapter} = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter))
  // setup for a global guard
  const lazyModuleLoader = app.get(LazyModuleLoader);
  // app.useGlobalGuards(new RolesGuard())
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();