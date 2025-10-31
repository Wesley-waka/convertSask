import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectService } from "src/projects/projects.service";
import { User } from "./user.entity";
import { Repository } from "typeorm";


@Injectable()
export class UsersService{
    constructor(
        // Using an external service via forwardRef
        // @Inject(forwardRef(()=>ProjectService))
        // private projectsService: ProjectService
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){}

    findAll(): Promise<User[]>{
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<User| null>{
        return this.usersRepository.findOneBy({id});
    }

    async remove(id: number): Promise<void>{
        await this.usersRepository.delete(id);
    }
}