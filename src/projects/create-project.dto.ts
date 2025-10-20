import {IsString,IsInt} from 'class-validator';

export class CreateProjectDto{
    @IsString()
    name: string;

    @IsInt()
    age: number;

    @IsString()
    breed: string;
}