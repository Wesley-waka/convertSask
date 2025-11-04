import { HttpAdapterHost, LazyModuleLoader, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './projects/all-exception.filter';
import { HttpException, ValidationPipe, VERSION_NEUTRAL, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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