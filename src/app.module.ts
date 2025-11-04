import { Inject, Injectable, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { LoggerMiddleware } from './projects/logger.middleware';
import { ProjectsController } from './projects/project.controller';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
// import { ConfigModule } from './config/config.module';
import { ProjectService } from './projects/projects.service';
import { ConfigModule, ConfigService} from '@nestjs/config'
import configuration from './config/configuration';
import databaseConfig from './config/database.config';
import * as Joi from 'joi';
import { validate } from './env.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './schemas/cat.schema';
import { CACHE_MANAGER, CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import KeyvRedis, { Keyv } from '@keyv/redis';
import {CacheableMemory} from 'cacheable';
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
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/test',{
    //   connectionFactory: (connection) =>{
    //     connection.plugin(require('mongoose-autopopulate'));
    //     return connection;
    //   }
    // })
    CacheModule.registerAsync({
      useFactory: async () =>{
        return {
          stores: [
            new Keyv({
              store: new CacheableMemory({ttl: 6000,lruSize: 500})
            }),
            new KeyvRedis('redis://localhost:6379')
          ]
        }
      }
    }),
    CacheModule.registerAsync({
      useFactory: () =>({
        ttl: 5,
      })
    })

    // MongooseModule.forRoot('mongodb://localhost/test',{
    //   connectionName: 'cats'
    // }),
    // MongooseModule.forRoot('mongodb://localhost/users',{
    //   connectionName: 'users'
    // })
    // MongooseModule.forFeatureAsync([
    //   {
    //     name: Cat.name,
    //     useFactory: () => {
    //       const schema = CatSchema;

    //     // schema.pre('save',function(){
    //     //   console.log('Hello from pre save')
    //     // });
        
    //       schema.plugin(require('mongoose-autocomplete'));
    //       return schema;
    //     },
    //     inject: [ConfigService],
    //   }
    // ])
  ],
  controllers: [AppController],

  // providers: [
  //   {
  //     provide: APP_INTERCEPTOR,
  //     useClass: CacheInterceptor
  //   }
  // ]
})

export class AppModule{
  constructor(private dataSource: DataSource,@Inject(CACHE_MANAGER) private cacheManager: Cache){
    const value = await this.cacheManager.get('key')
  }
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
