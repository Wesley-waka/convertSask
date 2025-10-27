import {forwardRef, Inject, Injectable, OnModuleInit, Scope} from '@nestjs/common'
import { CreateProjectDto } from './zod-schema';
import { INQUIRER, ModuleRef, REQUEST } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';

@Injectable({scope: Scope.REQUEST})
export class ProjectService implements OnModuleInit{
    // constructor (
    //     @Inject(forwardRef(()=>UsersService))
    //     private commonService: UsersService
    // ){}
    private service: UsersService;
    constructor(private moduleRef: ModuleRef){}

    onModuleInit(){
        this.service = this.moduleRef.get(UsersService,{strict: false})
    }
    // constructor(@Inject(REQUEST) private request: Request){}
    // for GraphQL applications
    // constructor(@Inject(REQUEST) private request: Request){}
    // constructor(@Inject(INQUIRER) private parentClass: Object){}
    findAll():string{
        return 'This action return all projects';
    }

    findOne(params: any){
        return `This is what they are searching for ${params}`
    }

    create(body: CreateProjectDto){
        return body
    }
}