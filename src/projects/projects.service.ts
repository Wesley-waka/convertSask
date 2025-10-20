import {Injectable} from '@nestjs/common'
import { CreateProjectDto } from './zod-schema';

@Injectable()
export class ProjectService{
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