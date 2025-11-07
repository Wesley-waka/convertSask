import { HttpAdapterHost, LazyModuleLoader, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './projects/all-exception.filter';
import { HttpException, ValidationPipe, VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { ConsoleLogger } from '@nestjs/common/services/console-logger.service';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: new ConsoleLogger({
      json: true
    })
  });
  // URI versioning
  // app.enableVersioning({
  //   type: VersioningType.URI,
  // });

  // header versioning
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'Custom-Header',
  });

  app.enableVersioning({
    type: VersioningType.MEDIA_TYPE,
    key: 'v=',
  });

  app.use(cookieParser());

  // app.enableVersioning({
  //   defaultVersion: '1'
  //   defaultVersion: ['1','2']
  //   defautlVersion: VERSION_NEUTRAL
  // })

  const extractor = (request: FastifyRequest): string | string[] =>
    [request.headers['custom-versioning-field'] ?? '']
      .flatMap(v=> v.split(','))
      .filter(v=> !!v)
      .sort()
      .reverse()

  // const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.CUSTOM,
    extractor,
  })
  
    app.use(compression())

  const {httpAdapter} = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter))
  // setup for a global guard
  const lazyModuleLoader = app.get(LazyModuleLoader);
  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: true,
  }));
  // app.useGlobalGuards(new RolesGuard())
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();