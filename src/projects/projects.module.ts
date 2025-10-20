import {Module, ValidationPipe} from '@nestjs/common';
import {ProjectsController} from './project.controller';
import { ProjectService } from './projects.service';
import { APP_PIPE } from '@nestjs/core';

const mockProjectsService = {
    findAll: () => [],
    findOne: () => {},
    create: () => {},
}
@Module({
    imports: [],
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