import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Car {
    
  @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    make!: string;

    @Column()
    model!: string;
    
    @Column()
    weight!: number;
    
    @Column()
    color!: string;
}
