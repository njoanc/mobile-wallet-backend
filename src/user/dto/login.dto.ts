import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsMobilePhone,
} from 'class-validator';

export class LogInUserDto {
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @IsMobilePhone('en-RW')
  phone?: string;

  @IsString()
  @IsNotEmpty()
  pin: string;
}
