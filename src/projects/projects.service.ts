import {ArgumentMetadata, forwardRef, Inject, Injectable, OnModuleInit, ParseFilePipe, PipeTransform, Post, Scope, UploadedFile, UseInterceptors} from '@nestjs/common'
import { CreateProjectDto } from './zod-schema';
import { INQUIRER, LazyModuleLoader, ModuleRef, REQUEST } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';
import { ConfigService as configService, ConfigType } from '@nestjs/config';
import databaseConfig from 'src/config/database.config';
import { Cat } from 'src/schemas/cat.schema';
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Project } from './schemas/project.schems';
import {Express} from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpService } from '@nestjs/axios';

@Injectable({scope: Scope.REQUEST})
export class ProjectService {
    // constructor (
    //     @Inject(forwardRef(()=>UsersService))
    //     private commonService: UsersService
    // ){}
    private service: UsersService;
    // constructor(private moduleRef: ModuleRef){}
    // constructor(private lazyModuleLoader: LazyModuleLoader,configService: configService){
    //     const dbHost = configService.get<string>('database.host');
    // }

    // constructor(
    //     @Inject(databaseConfig.KEY)
    //     private dbConfig: ConfigType<typeof databaseConfig>,
    // ){}

    // constructor(@InjectModel(Project.name) private projectModel: Model<Project>){}

    constructor(@InjectConnection('projects') private connection: Connection,@InjectModel(Project.name) private projectModel: Model<Project>,httpService: HttpService){}

    // onModuleInit(){
    //     this.service = this.moduleRef.get(UsersService,{strict: false})
    // }
    // constructor(@Inject(REQUEST) private request: Request){}
    // for GraphQL applications
    // constructor(@Inject(REQUEST) private request: Request){}
    // constructor(@Inject(INQUIRER) private parentClass: Object){}
    // findAll():string{
    //     return 'This action return all projects';
    // }

    // findOne(params: any){
    //     return `This is what they are searching for ${params}`
    // }
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile(new ParseFilePipe({
        validators: [

        ]
    })) file: Express.Multer.File){
        console.log(file)
    }

    // create(body: CreateProjectDto){
    //     return this.projectModel.create(body)
    // }

    async create(createCatDto: CreateProjectDto): Promise<Project>{
        const createdCat = new this.projectModel(createCatDto);
        return createdCat.save();
    }

    async findAll(): Promise<Project[]>{
        // return this.projectModel.find().exec();
        return this.httpService.get('http://localhost:3000/cats')
    }


}

@Injectable()
export class FileSizeValidationPipe implements PipeTransform{
    transform(value: any,metadata: ArgumentMetadata){
        // "value" is an object containing the file's attribues and metadata
        const oneKb = 1000;
        return value.size < oneKb;
    }
}