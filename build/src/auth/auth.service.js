"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const utils_1 = require("../utils");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const exceptions_1 = require("../exceptions");
const cryptogen_1 = require("../user/utils/cryptogen");
const wallet_entity_1 = require("../wallet/entities/wallet.entity");
let AuthService = class AuthService {
    constructor(userService, jwtService, UserRepository) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.UserRepository = UserRepository;
    }
    async login(obj) {
        try {
            const user = await this.userService.findUser(obj);
            const payload = { sub: user.id };
            obj.pin = (0, utils_1.hashCred)(obj.pin);
            const newUser = await this.UserRepository.save(Object.assign({ id: user.id, lastLoggedIn: new Date().toLocaleString() }, obj));
            return {
                access_token: this.jwtService.sign(payload),
                message: 'Login Successful',
                user,
            };
        }
        catch (err) {
            throw new common_2.BadRequestException(err.message);
        }
    }
    async signup(obj) {
        try {
            const { email, phone } = obj;
            // Check if a user with the same email or phone already exists
            const existingUser = await this.UserRepository.findOne({
                where: [
                    { email }, // Check for existing email
                    { phone }, // Check for existing phone
                ],
            });
            if (existingUser) {
                throw new exceptions_1.DataConflictException('This user already exists!');
            }
            // Hash the user's pin
            const hashedPin = (0, utils_1.hashCred)(obj.pin);
            obj.pin = hashedPin;
            // Generate a new private key using the GenerateAddressWalletKey utility
            const privateKey = cryptogen_1.GenerateAddressWalletKey.generateAddressAndKey().privateKey;
            // Create a new user object and ensure you're passing only valid properties
            const newUser = this.UserRepository.create(Object.assign(Object.assign({}, obj), { beneficiaries: '', privateKey: (0, utils_1.hashCred)(privateKey) }));
            // Save the new user to the database
            await this.UserRepository.save(newUser);
            // Automatically create a wallet for the new user
            const walletInstance = new wallet_entity_1.Wallet();
            walletInstance.user = newUser;
            await walletInstance.save();
            // Return the response
            return {
                message: 'User created successfully. Please ensure you keep your private key safe and secure as there is no way to recover it if lost!',
                newUser,
                walletInstance,
                privateKey, // Return the plain private key to the user
            };
        }
        catch (err) {
            // Handle any errors
            throw new exceptions_1.DataConflictException(err.message);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map