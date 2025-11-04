import { Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/sequelize";
import { Connection } from 'mongoose';


@Injectable()
export class ProjectService{
    constructor(@InjectConnection() private readonly connection: Connection){}

    async startTransaction(){
        const session = await this.connection.startSession();

        try {
            await session.startTransaction();
            

            await this.connection.createCollection('projects');
            

            await session.commitTransaction();

        } catch (error) {
            await session.abortTransaction();
        } finally {
            await session.endSession();
        }
    }
}