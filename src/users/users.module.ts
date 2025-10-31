import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ConfigModule } from "@nestjs/config";
import { ConfigService } from "@nestjs/config";
import { User } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports:[
        ConfigModule,
        TypeOrmModule.forFeature([User])
    ],
    providers: [UsersService],
    exports: [UsersService,TypeOrmModule]
})

export class UsersModule{
    constructor(private configService: ConfigService){
        const dbHost = this.configService.get('database.host',{infer: true})!;
    }
}