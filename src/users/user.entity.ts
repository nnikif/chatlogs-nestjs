import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export default class User {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;

    @Column({unique: true})
    public email: string;

    @Column()
    public name: string;

    @Column()
    public  password: string;

}