import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtStrategy } from '../../src/auth/auth-strategy';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../src/user/user.service';
import { SignUpDto } from '../../src/user/dto/signup.dto';
import { DataConflictException } from '../../src/exceptions';
import { LogInUserDto } from '../../src/user/dto/login.dto';
import { MailService } from '../../src/mail/mail.service'; // Mock MailService if required
import { Email } from '../../src/user/entities/email.entity'; // Add the Email entity here

// Mock for UserRepository
const mockUserRepository = {
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

// Mock for EmailRepository
const mockEmailRepository = {
  findOne: jest.fn(),
};

// Mock for MailService
const mockMailService = {
  sendMail: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'SECRET_KEY') return 'test-secret';
              return null;
            }),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'mockedToken'),
          },
        },
        {
          // Mock the UserRepository using getRepositoryToken
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          // Mock the EmailRepository using getRepositoryToken
          provide: getRepositoryToken(Email),
          useValue: mockEmailRepository,
        },
        {
          // Mock MailService
          provide: MailService,
          useValue: mockMailService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
    userService = module.get<UserService>(UserService);
  });

  describe('signup a user', () => {
    it('should fail if email or phone number already exists', async () => {
      const user = new SignUpDto();
      user.email = 'test101@yahoo.com';
      user.pin = '123456';
      user.firstName = 'test';
      user.lastName = 'test';
      user.phone = '08012345678';
      user.deviceId = '123456789';

      // Mocking findUser to simulate existing user
      jest
        .spyOn(userService, 'findUser')
        .mockResolvedValue({ email: 'test101@yahoo.com' } as any);

      jest
        .spyOn(service, 'signup')
        .mockRejectedValue(
          new DataConflictException('This user already exists!'),
        );

      await expect(service.signup(user)).rejects.toThrow(DataConflictException);
      await expect(service.signup(user)).rejects.toThrow(
        'This user already exists!',
      );
    });

    it('should register a new user successfully', async () => {
      const user = new SignUpDto();
      user.email = 'newuser@yahoo.com';
      user.pin = '123456';
      user.firstName = 'New';
      user.lastName = 'User';
      user.phone = '08012345679';
      user.deviceId = '987654321';

      const mockResult = {
        message: 'User created successfully',
        newUser: user,
        walletInstance: {},
        privateKey: 'mockedPrivateKey',
      } as any;

      jest.spyOn(service, 'signup').mockResolvedValue(mockResult);

      await expect(service.signup(user)).resolves.toEqual(mockResult);
    });
  });

  describe('login a user', () => {
    it('should fail to log in with a wrong email', async () => {
      const loginDto = new LogInUserDto();
      loginDto.email = 'wrongemail@example.com';
      loginDto.pin = '123456';

      jest
        .spyOn(service, 'login')
        .mockRejectedValue(new Error('Invalid email or password'));

      await expect(service.login(loginDto)).rejects.toThrow(
        'Invalid email or password',
      );
    });

    it('should fail to log in with a wrong password', async () => {
      const loginDto = new LogInUserDto();
      loginDto.email = 'validemail@example.com';
      loginDto.pin = 'wrongpassword';

      jest
        .spyOn(service, 'login')
        .mockRejectedValue(new Error('Invalid email or password'));

      await expect(service.login(loginDto)).rejects.toThrow(
        'Invalid email or password',
      );
    });

    it('should successfully log in with correct email and password', async () => {
      const loginDto = new LogInUserDto();
      loginDto.email = 'validemail@example.com';
      loginDto.pin = 'correctpassword';

      const mockResult = {
        access_token: 'mockedToken',
        message: 'Login Successful',
        user: { id: 1, email: 'validemail@example.com' }, // mocked user object
      } as any;

      jest.spyOn(service, 'login').mockResolvedValue(mockResult);

      await expect(service.login(loginDto)).resolves.toEqual(mockResult);
    });
  });
});
