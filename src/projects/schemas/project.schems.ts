import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project{
    @Prop()
    name: string;

    @Prop()
    age: number;

    @Prop()
    breed: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);