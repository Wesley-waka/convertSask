import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { ProjectService } from "src/projects/projects.service";


@Injectable()
export class UsersService{
    constructor(
        @Inject(forwardRef(()=>ProjectService))
        private projectsService: ProjectService
    ){}

    find(id: string){
        return 'this is the current id for the user'
    }
}