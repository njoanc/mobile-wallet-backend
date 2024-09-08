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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const email_entity_1 = require("./entities/email.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
const exceptions_1 = require("../exceptions");
const utils_1 = require("../utils");
const mail_send_1 = require("../mail/interface-send/mail.send");
const uuid_1 = require("uuid");
const mail_service_1 = require("../mail/mail.service");
let UserService = class UserService {
    constructor(UserRepository, EmailRepository, user, configService, mailService) {
        this.UserRepository = UserRepository;
        this.EmailRepository = EmailRepository;
        this.user = user;
        this.configService = configService;
        this.mailService = mailService;
    }
    async findUser(login) {
        try {
            const singleUser = await this.UserRepository.find({
                where: [{ email: login.email }, { phone: login.phone }],
            });
            if (!singleUser.length) {
                throw new exceptions_1.UserNotFoundException();
            }
            const comparePin = singleUser[0].pin;
            const validPassword = await (0, utils_1.Compare)(login.pin, comparePin);
            if (!singleUser.length || !validPassword) {
                throw new exceptions_1.IncorrectCredentialsException();
            }
            return singleUser[0];
        }
        catch (err) {
            throw new common_2.BadRequestException('incorrect credentials!');
        }
    }
    async findUserById(id) {
        try {
            const singleUser = await this.UserRepository.findOne({ where: { id } });
            if (!singleUser)
                throw new exceptions_1.UserNotFoundException();
            return singleUser;
        }
        catch (error) {
            throw new common_2.BadRequestException(error.message);
        }
    }
    async findUserByEmail(email) {
        try {
            const singleUser = await this.UserRepository.findOne({
                where: { email },
            });
            if (!singleUser)
                throw new exceptions_1.UserNotFoundException();
            return singleUser;
        }
        catch (error) {
            throw new common_2.BadRequestException(error.message);
        }
    }
    async isVerifiedUser(id) {
        try {
            const singleUser = await this.findUserById(id);
            if (!singleUser.verified) {
                throw new exceptions_1.AccountNotVerifiedException();
            }
            return singleUser;
        }
        catch (error) {
            throw new common_2.BadRequestException(error.message);
        }
    }
    async updateUser(id, user) {
        try {
            const singleUser = await this.findUserById(id);
            if (user.pin || user.transactionPin) {
                throw new common_2.BadRequestException('try updating your tokens/pins in their specific endpoints');
            }
            const updatedUser = await this.UserRepository.save(Object.assign({ id: singleUser.id }, user));
            return { message: 'user updated successfully', updatedUser };
        }
        catch (err) {
            throw new common_2.BadRequestException(err.message);
        }
    }
    async requestVerifyEmail(data) {
        const BASE_URL = this.configService.get('API_BASE_URL');
        try {
            const checkEmail = await this.EmailRepository.findOne({ where: {
                    email: data.email,
                    valid: true,
                },
            });
            const token = (0, uuid_1.v4)().split('-').join('');
            const expiry = Date.now() + 1440 * 60 * 1000;
            // update the emailver row if the phone number already exists else create a new one
            const newEmailVer = checkEmail
                ? await this.EmailRepository.save({
                    id: checkEmail.id,
                    verifyToken: token,
                    verifyTokenExpiry: expiry,
                    email: data.email,
                    valid: true,
                })
                : await this.EmailRepository.save({
                    email: data.email,
                    verifyToken: token,
                    verifyTokenExpiry: expiry,
                });
            // TODO send mail
            const verifyEmail = (0, mail_send_1.mailStructure)([data.email], 'support@usewallet.io', 'Verify Your Account', this.configService.get('TEMPLATE_VERIFY_ACCOUNT'), {
                firstName: `${data.firstName}`,
                subject: 'Verify Your Account',
                verifyLink: `${BASE_URL}/user/verify/${token}/${data.email}`,
            });
            await this.mailService.send(verifyEmail);
            return {
                statusCode: 200,
                message: 'Email verification link sent successfully!',
            };
        }
        catch (error) {
            throw new common_2.BadRequestException(error.message);
        }
    }
    async verifyEmail(data) {
        try {
            const findEmailVerifyToken = await this.EmailRepository.findOne({ where: { verifyToken: data.token,
                    valid: true,
                    email: data.email, }
            });
            if (!findEmailVerifyToken) {
                return new common_2.BadRequestException('invalid token!');
            }
            if (findEmailVerifyToken.verifyTokenExpiry < Date.now() ||
                !findEmailVerifyToken.valid) {
                findEmailVerifyToken.valid = false;
                await findEmailVerifyToken.save();
                return new common_2.BadRequestException('token expired!, please try verifying your email again');
            }
            // delete this particular emailver row instance
            const user = await this.UserRepository.findOne({ where: { email: data.email,
                    verified: false, }
            });
            if (!user) {
                throw new exceptions_1.UserNotFoundException('This account has already been verified');
            }
            user.verified = true;
            await user.save();
            await findEmailVerifyToken.remove();
            return {
                statusCode: 200,
                message: 'Email verified successfully!',
            };
        }
        catch (error) {
            throw new common_2.BadRequestException('An error occurred!, it seems the link is invalid or this account has already been verified');
        }
    }
    async updatePin(data, id) {
        try {
            const user = await this.findUserById(id);
            if (!(await (0, utils_1.Compare)(data.oldPin, user.pin)))
                throw new exceptions_1.IncorrectCredentialsException('incorrect pin!');
            if (data.newPin !== data.confirmPin)
                throw new exceptions_1.IncorrectCredentialsException('Pin mismatch!');
            user.pin = (0, utils_1.hashCred)(data.newPin);
            await user.save();
            return {
                statusCode: 200,
                message: 'pin updated successfully',
            };
        }
        catch (error) {
            throw new exceptions_1.IncorrectCredentialsException(error.message);
        }
    }
    async resetPin(data) {
        try {
            const findUserToken = await this.UserRepository.findOne({ where: { resetToken: data.token, }
            });
            if (!findUserToken || Date.now() > findUserToken.resetTokenExpiry)
                throw new exceptions_1.TokenExpiredException('This token is invalid, please try resetting your password again');
            if (data.pin !== data.confirmPin)
                throw new exceptions_1.IncorrectCredentialsException('pin mismatch!');
            findUserToken.pin = (0, utils_1.hashCred)(data.pin);
            findUserToken.resetToken = '';
            findUserToken.resetTokenExpiry = Date.now();
            await findUserToken.save();
            return {
                statusCode: 200,
                message: 'pin reset successful!',
            };
        }
        catch (error) {
            throw new common_2.BadRequestException(error.message);
        }
    }
    async requestResetPin(data) {
        const BASE_URL = this.configService.get('API_BASE_URL');
        try {
            const findUser = await this.findUserByEmail(data.email);
            if (!findUser)
                throw new exceptions_1.UserNotFoundException();
            const token = (0, uuid_1.v4)().split('-').join('');
            findUser.resetToken = token;
            findUser.resetTokenExpiry = Date.now() + 30 * 60 * 1000;
            await findUser.save();
            // TODO: send email
            const resetPin = (0, mail_send_1.mailStructure)([data.email], 'support@usewallet.io', 'Reset your Pin', this.configService.get('TEMPLATE_RESET_PIN'), {
                firstName: `${findUser.firstName}`,
                subject: 'Reset Your Pin',
                resetLink: `${BASE_URL}/user/reset-pin/${token}`,
            });
            await this.mailService.send(resetPin);
            return {
                statusCode: 200,
                message: 'Reset pin link sent successfully!',
            };
        }
        catch (error) {
            throw new common_2.BadRequestException(error.message);
        }
    }
    async setTransactionPin(id, data) {
        try {
            const findUser = await this.findUserById(id);
            if (findUser.transactionPin) {
                throw new common_2.BadRequestException('oops, it seems you already have a transaction pin set up, if you want to change your pin, try updating it in the user settings');
            }
            if (data.newPin !== data.confirmPin)
                throw new exceptions_1.IncorrectCredentialsException('transaction pin mismatch!');
            findUser.transactionPin = (0, utils_1.hashCred)(data.newPin);
            await findUser.save();
            return {
                statusCode: 200,
                message: 'transaction pin set successfully !',
            };
        }
        catch (error) {
            throw new common_2.BadRequestException(error.message);
        }
    }
    async validateTransactionPin(data) {
        try {
            const findUser = await this.findUserById(data.userId);
            if (!findUser.transactionPin) {
                throw new exceptions_1.TransactionPinNotSetException();
            }
            if (!(await (0, utils_1.Compare)(data.pin, findUser.transactionPin))) {
                throw new exceptions_1.IncorrectCredentialsException('incorrect transactionPin!');
            }
            return {
                message: 'success!',
            };
        }
        catch (error) {
            throw new common_2.BadRequestException(error.message);
        }
    }
    async validatePrivateKey(id, data) {
        try {
            const user = await this.findUserById(id);
            if (!(await (0, utils_1.Compare)(data.privateKey, user.privateKey))) {
                throw new exceptions_1.IncorrectCredentialsException('incorrect key!');
            }
            return {
                statusCode: 200,
                message: 'key validated successfully, now you can go ahead to reset your transaction pin!',
            };
        }
        catch (error) {
            throw new exceptions_1.IncorrectCredentialsException('incorrect key!');
        }
    }
    async resetTransactionPin(id, data) {
        try {
            const findUser = await this.findUserById(id);
            if (data.transactionPin !== data.confirmPin)
                throw new exceptions_1.IncorrectCredentialsException(' transaction pin mismatch!');
            findUser.transactionPin = (0, utils_1.hashCred)(data.transactionPin);
            await findUser.save();
            return {
                statusCode: 200,
                message: 'transaction pin reset successfully!',
            };
        }
        catch (error) {
            throw new common_2.BadRequestException(error.message);
        }
    }
    async updateTransactionPin(data, id) {
        try {
            const user = await this.findUserById(id);
            if (!(await (0, utils_1.Compare)(data.oldPin, user.transactionPin)))
                throw new exceptions_1.IncorrectCredentialsException('incorrect transaction pin!');
            if (data.newPin !== data.confirmPin)
                throw new exceptions_1.IncorrectCredentialsException('Pin mismatch!');
            user.transactionPin = (0, utils_1.hashCred)(data.newPin);
            await user.save();
            return {
                statusCode: 200,
                message: 'transaction pin updated successfully',
            };
        }
        catch (error) {
            throw new exceptions_1.IncorrectCredentialsException(error.message);
        }
    }
    async addBeneficiary(id, data) {
        try {
            const findUser = await this.findUserById(id);
            //check if beneficiary already exists
            let findBeneficiary = await this.findUserByEmail(data.email);
            if (findBeneficiary) {
                // check if beneficiary is the same user
                if (findBeneficiary.email === findUser.email) {
                    throw new exceptions_1.CannotAddSelfException();
                }
                // check if beneficiary is already added
                const userBeneficiaries = findUser.beneficiaries;
                // convert the beneficiaries string to an array representation
                const userBeneficiariesArr = (0, utils_1.stringToArray)(userBeneficiaries);
                // check if the beneficiary is already added
                const isBeneficiaryAdded = userBeneficiariesArr.find((beneficiary) => {
                    return beneficiary.email === findBeneficiary.email;
                });
                if (isBeneficiaryAdded) {
                    throw new exceptions_1.BeneficiaryAlreadyAddedException();
                }
                // exclude certain fields the user should not see and add the beneficiary
                findBeneficiary = (0, utils_1.excludeFields)([
                    'pin',
                    'transactionPin',
                    'privateKey',
                    'createdAt',
                    'updatedAt',
                    'resetToken',
                    'resetTokenExpiry',
                    'isAdmin',
                    'dob',
                    'beneficiaries',
                    'deviceId',
                    'deviceIp',
                    'deviceModel',
                    'verified',
                    'platform',
                    'lastLoggedIn',
                    'createdAt',
                    'updatedAt',
                    'id',
                ], findBeneficiary);
                userBeneficiariesArr.push(findBeneficiary);
                // convert back to string before saving to db
                findUser.beneficiaries = (0, utils_1.arrayToString)(userBeneficiariesArr);
                await findUser.save();
                return {
                    statusCode: 200,
                    message: 'beneficiary added successfully!',
                };
            }
            else {
                throw new exceptions_1.UserNotFoundException();
            }
        }
        catch (error) {
            throw new common_2.BadRequestException(error.message);
        }
    }
    async viewAllUserBeneficiaries(id) {
        try {
            const findUser = await this.findUserById(id);
            const beneficiaries = (0, utils_1.stringToArray)(findUser.beneficiaries);
            if (beneficiaries.length === 0) {
                throw new exceptions_1.NoBeneficiariesException();
            }
            return {
                statusCode: 200,
                message: 'beneficiaries retrieved successfully!',
                beneficiaries,
            };
        }
        catch (error) {
            throw new common_2.BadRequestException(error.message);
        }
    }
    async deleteBeneficiary(id, data) {
        try {
            const findUser = await this.findUserById(id);
            const beneficiaries = (0, utils_1.stringToArray)(findUser.beneficiaries);
            const findBeneficiary = beneficiaries.find((beneficiary) => {
                return beneficiary.email === data.email;
            });
            if (!findBeneficiary) {
                throw new exceptions_1.BeneficiaryNotFoundException();
            }
            // remove the beneficiary from the array
            beneficiaries.splice(beneficiaries.indexOf(findBeneficiary), 1);
            // convert back to string before saving to db
            findUser.beneficiaries = (0, utils_1.arrayToString)(beneficiaries);
            await findUser.save();
            return {
                statusCode: 200,
                message: 'beneficiary deleted successfully!',
            };
        }
        catch (error) {
            throw new exceptions_1.BeneficiaryNotFoundException(error.message);
        }
    }
    async checkBeneficiary(id, data) {
        try {
            const findUser = await this.findUserById(id);
            const beneficiaries = (0, utils_1.stringToArray)(findUser.beneficiaries);
            const findBeneficiary = beneficiaries.find((beneficiary) => {
                return beneficiary.email === data.email;
            });
            if (!findBeneficiary) {
                throw new exceptions_1.BeneficiaryNotFoundException();
            }
            return {
                statusCode: 200,
                message: 'beneficiary found successfully!',
                data: findBeneficiary,
            };
        }
        catch (error) {
            throw new exceptions_1.BeneficiaryNotFoundException(error.message);
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(email_entity_1.Email)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        user_entity_1.User,
        config_1.ConfigService,
        mail_service_1.MailService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map