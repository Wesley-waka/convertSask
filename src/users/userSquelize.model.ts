import { Column, Table } from "typeorm";

@Table()
export class User extends Model{
    @Column
    firstName: string;

    @Column
    lastName: string;

    @Column({defaultValue: true})
    isActive: boolean;

    @HasMany(()=>Photo)
    photos: Photo[]
}