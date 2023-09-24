import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { Types } from 'mongoose';

@Entity()
export class Upload {
    @PrimaryGeneratedColumn()
    _id: Types.ObjectId;

    @Column()
    filename: string;

    @Column()
    path: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
}