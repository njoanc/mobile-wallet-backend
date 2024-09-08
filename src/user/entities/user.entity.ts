import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';
import { BaseEntity as CustomBaseEntity } from "../../utils/base.entity";
import { IsEmail, IsEnum, IsOptional } from 'class-validator';
import {Platform} from "../../utils/enums/platform.enum"
import { Role } from "../../utils/enums/role.enum"

@Entity('User')
export class User extends CustomBaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: '' })
    firstName?: string;

    @Column({ default: '' })
    lastName?: string;

    @Column({ 
        type: 'varchar', 
        unique: true, // Ensure email is unique in the database
        nullable: false 
    })
    @IsEmail({}, { message: 'Invalid email format' })  // Validate email format
    email: string;

    @Column()
    pin?: string;

    @Column()
    phone?: string;

    @Column({ default: '' })
    transactionPin?: string;

    @Column({ default: false })
    verified?: boolean;

    @Column({ default: '' })
    privateKey?: string;

    @Column({ default: '' })
    resetToken?: string;

    @Column({ default: 10000, type: 'bigint' })
    resetTokenExpiry?: number;

    // Date of birth field
    @Column({ default: '' })
    dob?: string;

    @Column({ default: false })
    isAdmin?: boolean;

    @Column({ type: 'varchar', default: '' })
    deviceId?: string;

    @Column({ type: 'varchar', default: '' })
    deviceIp?: string;

    @Column({ type: 'varchar', default: '' })
    deviceModel?: string;

    @Column({
        type: 'enum',
        enum: Platform,  // Reference enum from the file
        default: Platform.ANDROID,
    })
    @IsEnum(Platform, { message: 'Platform must be one of: android, ios, web' })  // Validate platform
    platform: Platform;

    @Column({ type: 'varchar', default: '' })
    lastLoggedIn?: string;

    @Column({ type: 'text', nullable: true })
    @IsOptional()
    beneficiaries?: string;

    // Adding a role field
    @Column({
        type: 'enum',
        enum: Role,  // Reference enum for roles
        default: Role.USER,
    })
    @IsEnum(Role, { message: 'Role must be one of: user, admin, super_admin' })  // Validate role
    role: Role;

   
}
