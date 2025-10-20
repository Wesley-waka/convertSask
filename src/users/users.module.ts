import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";


@Module({
    import:[],
    providers: [UsersService],
    exports: [UsersService]
})

export class UsersModule{}