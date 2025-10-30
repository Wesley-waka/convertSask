import { Injectable, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { LoggerMiddleware } from './projects/logger.middleware';
import { ProjectsController } from './projects/project.controller';
import { APP_GUARD } from '@nestjs/core';
// import { ConfigModule } from './config/config.module';
import { ProjectService } from './projects/projects.service';
import { ConfigModule} from '@nestjs/config'
import configuration from './config/configuration';
import databaseConfig from './config/database.config';
import * as Joi from 'joi';
import { validate } from './env.validation';
// const provider= {
//   provide: 'CONNECTION',
//   useFactory:(myProvider:string,myOptionalProvider?:string)=>{
//     const provider=myProvider.get();
//     return new DatabaseConnection(provider);
//   },
//   Inject:[myProvider,myOptionalProvider],
// }


@Module({
  imports: [ProjectsModule,ConfigModule.forRoot({ 
    load: [databaseConfig],
    validate,
    validationSchema: Joi.object({
      NODE_ENV: Joi.string()
      .valid('development','production','test','provision')
      .default('development'),
      PORT: Joi.number().port().default(3000)
    }),
    validationOptions: {
      allowUnkown: false,
      abortEarly: true,
    },
    envFilePath: ['.development.env','.env.development.local','env.development'],
    cache: true,
    expandVariables: true
  }),
    // ConditionalModule.registerWhen(FooBarModule,(env: NodeJS.ProcessEnv) => !!env['foo'] && !!env['bar']),
  ],
  controllers: [AppController],
  providers: [AppService],
  /*
  providers: [
    {
    provide: APP_GUARD,
    useClass: RolesGuard
    },
  ],
  */
})

export class AppModule{

}



// @Module({
//   imports: [ConfigModule.register({folder: './config'})],
//   controllers: [AppController],
//   providers: [AppService]
// })


// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(LoggerMiddleware)
//       .forRoutes(ProjectsController);
//   }
// }
