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
    load: [configuration],
    envFilePath: ['.development.env','.env.development.local','env.development']
  })],
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
