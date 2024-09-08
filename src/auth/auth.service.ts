import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LogInUserDto } from '../user/dto/login.dto';
import { SignUpDto } from '../user/dto/signup.dto';
import { hashCred } from '../utils';
import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { DataConflictException } from '../exceptions';
import { GenerateAddressWalletKey } from '../user/utils/cryptogen';
import { Wallet } from '../wallet/entities/wallet.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        @InjectRepository(User) private UserRepository: Repository<User>,
    ) {}

    async login(obj: LogInUserDto) {
        try {
            const user = await this.userService.findUser(obj);

            const payload = { sub: user.id };
            obj.pin = hashCred(obj.pin);
            const newUser = await this.UserRepository.save({
                id: user.id,
                lastLoggedIn: new Date().toLocaleString(),
                ...obj,
            });
            return {
                access_token: this.jwtService.sign(payload),
                message: 'Login Successful',
                user,
            };
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    async signup(obj: SignUpDto) {
        try {
            const { email, phone } = obj;
    
            // Check if a user with the same email or phone already exists
            const existingUser = await this.UserRepository.findOne({
                where: [
                    { email },  // Check for existing email
                    { phone },  // Check for existing phone
                ],
            });
    
            if (existingUser) {
                throw new DataConflictException('This user already exists!');
            }
    
            // Hash the user's pin
            const hashedPin = hashCred(obj.pin);
            obj.pin = hashedPin;
    
            // Generate a new private key using the GenerateAddressWalletKey utility
            const privateKey = GenerateAddressWalletKey.generateAddressAndKey().privateKey;
    
            // Create a new user object and ensure you're passing only valid properties
            const newUser = this.UserRepository.create({
                ...obj,  // Spread the SignUpDto object
                beneficiaries: '',  // Initialize with an empty array as string
                privateKey: hashCred(privateKey),  // Hash the private key for security
            });
    
            // Save the new user to the database
            await this.UserRepository.save(newUser);
    
            // Automatically create a wallet for the new user
            const walletInstance = new Wallet();
            walletInstance.user = newUser;
            await walletInstance.save();
    
            // Return the response
            return {
                message: 'User created successfully. Please ensure you keep your private key safe and secure as there is no way to recover it if lost!',
                newUser,
                walletInstance,
                privateKey,  // Return the plain private key to the user
            };
        } catch (err) {
            // Handle any errors
            throw new DataConflictException(err.message);
        }
    }
    
    
}
