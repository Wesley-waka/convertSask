import { Module } from "@nestjs/common";
import { UsersModule } from "./users.module";
import { UsersService } from "./users.service";

@Module({
    imports: [UsersModule],
    providers: [UsersService],
    // controllers: [UsersController]
})

export class UserHttpModule{}