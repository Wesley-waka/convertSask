import { Body, Controller,DefaultValuePipe,Get, HttpStatus, Param, ParseBoolPipe, ParseIntPipe, Post, Query, Scope, UseFilters, UseInterceptors, UsePipes, ValidationPipe, Version } from "@nestjs/common";
import { ProjectService } from "./projects.service";
import { ForbiddenException } from "./forbidden.exception";
import { HttpExceptionFilter } from "./http-exception.filter";
import { ZodValidationPipe } from "./zod-validation";
import { createProjectSchema, CreateProjectDto } from "./zod-schema";
import { Roles } from "./decorator/roles.decorator";
import { LoggingInterceptor } from "./interceptors/logging.interceptor";

@Controller({
    path: 'project',
    scope: Scope.REQUEST,
    version: '1'
})
// @UseGuards(new RolesGuard())
@UseInterceptors(LoggingInterceptor)
export class ProjectsController{

    constructor(private  readonly projectService: ProjectService){}

    @Get()
    @UseFilters(HttpExceptionFilter)
    @Version('1')
    findAllV1(
        @Query('activeOnly',new DefaultValuePipe(false),ParseBoolPipe) activeOnly: boolean,
        @Query('page',new DefaultValuePipe(0),ParseIntPipe) page: number,
    ):string{
        return this.projectService.findAll()
        // throw new HttpException('forbidden',HttpStatus.FORBIDDEN)
        // throw new ForbiddenException();
    }

    @Get()
    @UseFilters(HttpExceptionFilter)
    @Version('2')
    findAllV2(
        @Query('activeOnly',new DefaultValuePipe(false),ParseBoolPipe) activeOnly: boolean,
        @Query('page',new DefaultValuePipe(0),ParseIntPipe) page: number,
    ):string{
        return this.projectService.findAll()
        // throw new HttpException('forbidden',HttpStatus.FORBIDDEN)
        // throw new ForbiddenException();
    }

    @Get(':id')
    @UsePipes(new ValidationPipe({transform: true}))
    find(@Param('id',new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) params: any){
        return this.projectService.findOne(params)
    }

    @Get()
    findSome(@Query() song: string,@Query() name: string){
        return `The name of the project is ${song} written by ${name}`
    }

    @Post()
    @Roles(['admin'])
    @UsePipes(new ZodValidationPipe(createProjectSchema))
    create(@Body() body: CreateProjectDto){
        return this.projectService.create(body)
    }
}
