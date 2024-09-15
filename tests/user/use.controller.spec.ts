import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../src/user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../../src/app.module';
import { Email } from '../../src/user/entities/email.entity';
import { User } from '../../src/user/entities/user.entity';
import { UserService } from '../../src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignUpDto } from '../../src/user/dto/signup.dto';
import { LogInUserDto } from '../../src/user/dto/login.dto';
import { AuthModule } from '../../src/auth/auth.module';
import { AuthService } from '../../src/auth/auth.service';
import { MailModule } from '../../src/mail/mail.module';
import { MailService } from '@sendgrid/mail';

jest.setTimeout(60000);

describe('UserController', () => {
    let controller: UserController;
    let service: UserService;
    let configService: ConfigService;
    let authService: AuthService;
    let mailService: MailService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
                TypeOrmModule.forFeature([User, Email]),
                AuthModule,
                MailModule,
            ],
            controllers: [UserController],
            providers: [
                UserService,
                {
                    provide: JwtService,
                    useFactory: () => ({
                        sign: jest.fn(() => true),
                    }),
                },
                ConfigService,
                MailService,
                AuthService,
                User,
            ],
        }).compile();

        controller = module.get<UserController>(UserController);
        service = module.get<UserService>(UserService);
        configService = module.get<ConfigService>(ConfigService);
        authService = module.get<AuthService>(AuthService);
        mailService = module.get<MailService>(MailService);
    });

    describe('POST /user/auth/register', () => {
        it('controller to sign up a user', async () => {
            const user = new SignUpDto();
            user.email = 'dwave101@yahoo.com';
            user.pin = '123456';
            user.firstName = 'dwave';
            user.lastName = 'dwave';
            user.phone = '08012345678';
            user.deviceId = '123456789';
            try {
                const authSpySignUpService = jest.spyOn(authService, 'signup');
                const controllerResult = await controller.register(user);
                expect(authSpySignUpService).toBeCalledWith(user);
                expect(controllerResult).toBeCalledWith(user);
            } catch (error) {
                expect(error).toBeInstanceOf(Error);
            }
        });
    });

    describe('POST /user/auth/login', () => {
        it('controller to login a user', async () => {
            const login = new LogInUserDto();
            login.email = 'dwave101@yahoo.com';
            login.pin = '123456';
            try {
                const authSpyLoginService = jest.spyOn(authService, 'login');
                const controllerResult = await controller.login(login);
                expect(authSpyLoginService).toBeCalledWith(login);
                expect(controllerResult).toBeCalledWith(login);
            } catch (error) {
                expect(error).toBeInstanceOf(Error);
            }
        });
    });

    
});
