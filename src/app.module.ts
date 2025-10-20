import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { LoggerMiddleware } from './projects/logger.middleware';
import { ProjectsController } from './projects/project.controller';
import { APP_GUARD } from '@nestjs/core';

// const provider= {
//   provide: 'CONNECTION',
//   useFactory:(myProvider:string,myOptionalProvider?:string)=>{
//     const provider=myProvider.get();
//     return new DatabaseConnection(provider);
//   },
//   Inject:[myProvider,myOptionalProvider],
// }


@Module({
  imports: [ProjectsModule],
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


export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(ProjectsController);
  }
}
