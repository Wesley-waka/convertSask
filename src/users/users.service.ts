import { Injectable } from "@nestjs/common";


@Injectable()
export class UsersService{

    find(id: string){
        return 'this is the current id for the user'
    }
}