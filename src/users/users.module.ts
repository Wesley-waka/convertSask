import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ConfigModule } from "@nestjs/config";
import { ConfigService } from "@nestjs/config";
import { User } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserSubscriber } from "./users.subscribe";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
    imports:[
        ConfigModule,
        TypeOrmModule.forFeature([User]),
        // Using schema instead
        // TypeOrmModule.forFeature([UseSchema])
        SequelizeModule.forFeature([User])
    ],
    providers: [UsersService,UserSubscriber],
    exports: [UsersService,TypeOrmModule]
})

export class UsersModule{
    constructor(private configService: ConfigService){
        const dbHost = this.configService.get('database.host',{infer: true})!;
    }
}