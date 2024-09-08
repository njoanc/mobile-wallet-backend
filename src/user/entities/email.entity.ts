import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';
import { BaseEntity as CustomBaseEntity } from "../../utils/base.entity";

@Entity('Email')
export class Email extends CustomBaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', default: '' })
    verifyToken?: string;

    @Column({ type: 'varchar', default: '' })
    email?: string;

    @Column({ default: 2 + 15 * 60 * 1000, type: 'bigint' })
    verifyTokenExpiry?: number;

    @Column({ default: true })
    valid?: boolean;

   
}
