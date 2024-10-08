import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Email} from './entities/email.entity';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([User, Email]),
        User,
        Email,
        MailModule,
    ],
    controllers: [UserController],
    exports: [TypeOrmModule, UserService],
    providers: [UserService, User, Email],
})
export class UserModule {}
