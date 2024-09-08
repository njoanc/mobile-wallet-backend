import {
    IsNotEmpty,
    IsString,
    IsEmail,
    IsMobilePhone,
    MinLength,
    IsOptional,
    IsEnum,
    Matches,
} from 'class-validator';
import { Platform } from '../../utils/enums/platform.enum';

export class SignUpDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    firstName?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    lastName?: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'Pin must be at least 6 characters' })
    pin?: string;

    @Matches(/^(\+2507)\d{8}$/, { message: 'Phone number must be a valid Rwandan number' })
    @IsString()
    @IsNotEmpty()
    phone?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    deviceId?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    deviceModel?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    deviceIp?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    address?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    transactionPin?: string;

    @IsOptional()
    @IsEnum(Platform, { message: 'Platform must be one of: android, ios, web' })
    platform?: Platform;
}