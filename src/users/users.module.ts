import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ConfigModule } from "@nestjs/config";
import { ConfigService } from "@nestjs/config";

@Module({
    imports:[
        ConfigModule,
    ],
    providers: [UsersService],
    exports: [UsersService]
})

export class UsersModule{
    constructor(private configService: ConfigService){
        const dbHost = this.configService.get('database.host',{infer: true})!;
    }
}