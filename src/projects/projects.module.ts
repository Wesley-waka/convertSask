import {Module, ValidationPipe} from '@nestjs/common';
import {ProjectsController} from './project.controller';
import { ProjectService } from './projects.service';
import { APP_PIPE } from '@nestjs/core';
import databaseConfig from 'src/config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat, CatSchema } from 'src/schemas/cat.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './schemas/project.schems';

const mockProjectsService = {
    findAll: () => [],
    findOne: () => {},
    create: () => {},
}
@Module({
    imports:[
        MongooseModule.forFeature([{
            name: Project.name,
            schema: ProjectSchema
        }],'projects')
    ],
    // imports: [
    //     TypeOrmModule.forRootAsync(databaseConfig.asProvider())
    // ],
    controllers: [ProjectsController],
    providers: [ProjectService],
    // providers: [
    //     {
    //         provide: APP_PIPE,
    //         useClass: ValidationPipe
    //     }
    // ],
    // providers:[
    //     {
    //         provide: ProjectsService,
    //         useValue: mockProjectsService
    //     }
    // ]
})

export class ProjectsModule{}