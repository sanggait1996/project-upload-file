
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    age: number;

    @Column()
    gender: number;

    @Column()
    address: string;

    @Column({ nullable: true })
    access_token?: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
}