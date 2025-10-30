import {Module, ValidationPipe} from '@nestjs/common';
import {ProjectsController} from './project.controller';
import { ProjectService } from './projects.service';
import { APP_PIPE } from '@nestjs/core';
import databaseConfig from 'src/config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';

const mockProjectsService = {
    findAll: () => [],
    findOne: () => {},
    create: () => {},
}
@Module({
    imports: [
        TypeOrmModule.forRootAsync(databaseConfig.asProvider())
    ],
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