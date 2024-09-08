import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { BaseEntity as CustomBaseEntity } from "../../utils/base.entity";

@Entity('Wallet')
export class Wallet extends CustomBaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User, (user) => user.id, {
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinColumn()
    user: User;

    @Column({ default: 0 })
    balance: number;

   
}
