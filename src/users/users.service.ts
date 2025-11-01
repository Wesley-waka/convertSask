import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectService } from "src/projects/projects.service";
// import { User } from "./user.entity";
import { User } from "./user.model";
import { DataSource, Repository } from "typeorm";
import { InjectModel } from "@nestjs/sequelize";
import { Sequelize } from "sequelize";
import { User as UserModel } from "./userSquelize.model";

@Injectable()
// export class UsersService{
//     constructor(
//         // Using an external service via forwardRef
//         // @Inject(forwardRef(()=>ProjectService))
//         // private projectsService: ProjectService
//         @InjectRepository(User)
//         private usersRepository: Repository<User>,
//     ){}


//     findAll(): Promise<User[]>{
//         return this.usersRepository.find();
//     }

//     findOne(id: number): Promise<User| null>{
//         return this.usersRepository.findOneBy({id});
//     }

//     async remove(id: number): Promise<void>{
//         await this.usersRepository.delete(id);
//     }
// }

// Using Query runner
export class UsersService{
    constructor(private dataSource: DataSource){}
    
    async createMany(users: User[]){
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try{
            await queryRunner.manager.save(users[0]);
            await queryRunner.manager.save(users[1]);

            await queryRunner.commitTransaction();

        }catch(err){
            // a rollback of transactions
            await queryRunner.rollbackTransaction();
        }finally{
            // you need to release a queryRunner which was manually instantiated
            await queryRunner.release();
        }
    }
}

// Using the UsersService with Sequelize
@Injectable()
export class SequelizeUsersService{
    constructor(
        @InjectModel(User)
        private userModel: typeof User
    ){}

    async findAll(): Promise<User[]>{
        return this.userModel.findAll();
    }

    findOne(id: string): Promise<User | null>{
        return this.userModel.findOne({
            where: {
                id,
            }
        })
    }

    async remove(id: string): Promise<void>{
        const user = await this.findOne(id);
        await user?.destroy();
    }
}

@Injectable()
export class UsersSequelizeService{
    constructor(private sequelize: Sequelize){}

    async createMany(){
        try{
            await this.sequelize.transaction(async t =>{
                const transactionHost = {transaction: t};

                await User.create(
                    {firstName: 'Abraham',lastName: 'Lincoln'},
                    transactionHost
                )
                await User.create(
                    {firstName: 'John',lastName: 'Boothe'}
                    transactionHost,
                );
            });
        }catch(err){}
    }
}

