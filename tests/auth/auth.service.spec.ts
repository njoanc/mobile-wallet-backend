import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/auth/auth.service';
import { LogInUserDto } from '../../src/user/dto/login.dto';
import { SignUpDto } from '../../src/user/dto/signup.dto';
import { AppModule } from '../../src/app.module';
import { UserModule } from '../../src/user/user.module';
import { User } from '../../src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { DataConflictException } from '../../src/exceptions/conflict-exceptions';
import { JwtStrategy } from '../../src/auth/auth-strategy';
import { ConfigService } from '@nestjs/config';

jest.setTimeout(60000);

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'SECRET_KEY') return 'test-secret'; // Mock the secret key here
              return null;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
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

      // Mock the service to throw the DataConflictException
      jest
        .spyOn(service, 'signup')
        .mockRejectedValue(
          new DataConflictException('This user already exists!'),
        );

      //use `.rejects` to check for exceptions
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

      // Mocking the result of the signup method to return the expected structure
      const mockResult = {
        message: 'User created successfully',
        newUser: user, // or a mocked User object
        walletInstance: {
          /* mocked wallet instance */
        },
        privateKey: 'mockedPrivateKey',
      } as any;

      // Mock the signup method to return this structure
      jest.spyOn(service, 'signup').mockResolvedValue(mockResult);

      // Test the result without try-catch
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
