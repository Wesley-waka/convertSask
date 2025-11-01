import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class Cat{
    @Prop({required: true})
    name: string;
    
    @Prop()
    age: number;

    @Prop()
    breed: string;

    // One to one relationship
    // @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Owner'})
    // owner: Owner;
    // owner: mongoose.Types.ObjectId;


    // one to many relationship
    // @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Owner'}]})
    // owners: Owner[];


}

export const CatSchema = SchemaFactory.createForClass(Cat)