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
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { MongooseModule } from '@nestjs/mongoose';
// const provider= {
//   provide: 'CONNECTION',
//   useFactory:(myProvider:string,myOptionalProvider?:string)=>{
//     const provider=myProvider.get();
//     return new DatabaseConnection(provider);
//   },
//   Inject:[myProvider,myOptionalProvider],
// }


// @Module({
//   imports: [ProjectsModule,ConfigModule.forRoot({ 
//     load: [databaseConfig],
//     validate,
//     validationSchema: Joi.object({
//       NODE_ENV: Joi.string()
//       .valid('development','production','test','provision')
//       .default('development'),
//       PORT: Joi.number().port().default(3000)
//     }),
//     validationOptions: {
//       allowUnkown: false,
//       abortEarly: true,
//     },
//     envFilePath: ['.development.env','.env.development.local','env.development'],
//     cache: true,
//     expandVariables: true
//   }),
//     // ConditionalModule.registerWhen(FooBarModule,(env: NodeJS.ProcessEnv) => !!env['foo'] && !!env['bar']),
//   ],
//   controllers: [AppController],
//   providers: [AppService],
//   /*
//   providers: [
//     {
//     provide: APP_GUARD,
//     useClass: RolesGuard
//     },
//   ],
//   */
// })


const defaultOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'test',
  entities: [User],
  // set true only in development
  // synchronize: true
  autoLoadEntities: true,
};

const defaultOptions2 = {
  type: 'postgres',
  port: 5432,
  username: 'user',
  password: 'password',
  database: 'db',
  synchronize: true,
};


// Database intergration

// @Module({
//   imports: [
//     // TypeOrmModule.forRoot({
//     //   type: 'mysql',
//     //   host: 'localhost',
//     //   port: 3306,
//     //   username: 'root',
//     //   password: 'root',
//     //   database: 'test',
//     //   entities: [User],
//     //   // set true only in development
//     //   // synchronize: true
//     //   autoLoadEntities: true,
//     // })

//     // for dynamicness when difference in storage
//     // TypeOrmModule.forRoot({
//     //   ...defaultOptions,
//     //   host: 'uder_db_host',
//     //   entities: [User]
//     // }),
//     // TypeOrmModule.forRoot({
//     //   ...defaultOptions2,
//     //   name: 'albumsConnection',
//     //   host: 'album_db_host',
//     //   entities: [Album]
//     // })
//     SequelizeModule.forRoot({
//       dialect: 'mysql',
//       host: 'localhost',
//       port: 3306,
//       username: 'root',
//       password: 'root',
//       database: 'test',
//       models: [],
//       autoLoadModels: true,
//       synchronize: true
//     })
//     // TypeOrmModule.forFeature([User]),
//     // TypeOrmModule.forFeature([Album],'albumsConnection')
//   ]
// })

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/nest')]
})

export class AppModule{
  constructor(private dataSource: DataSource){}
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
