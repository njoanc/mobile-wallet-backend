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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const common_2 = require("@nestjs/common");
const guards_1 = require("../auth/guards");
const user_decorator_1 = require("./decorators/user.decorator");
const swagger_1 = require("@nestjs/swagger");
const login_dto_1 = require("./dto/login.dto");
const signup_dto_1 = require("./dto/signup.dto");
const user_service_1 = require("./user.service");
const change_pin_dto_1 = require("./dto/change-pin.dto");
const reset_pin_dto_1 = require("./dto/reset-pin.dto");
const request_reset_pin_dto_1 = require("./dto/request-reset-pin.dto");
const transaction_pin_dto_1 = require("./dto/transaction-pin.dto");
const reset_transaction_pin_dto_1 = require("./dto/reset-transaction-pin.dto");
const private_key_dto_1 = require("./dto/private-key.dto");
const beneficiary_dto_1 = require("./dto/beneficiary.dto");
const change_transaction_pin_dto_1 = require("./dto/change-transaction-pin.dto");
let UserController = class UserController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async view(user) {
        return await this.userService.findUserById(user.userId);
    }
    async login(body) {
        return await this.authService.login(body);
    }
    async register(body) {
        return await this.authService.signup(body);
    }
    async update(params, body) {
        return await this.userService.updateUser(params.id, body);
    }
    async updateUserPin(body, users) {
        return await this.userService.updatePin(body, users.userId);
    }
    async setUserTransactionPin(body, users) {
        return await this.userService.setTransactionPin(users.userId, body);
    }
    async validateUserPrivateKey(body, users) {
        return await this.userService.validatePrivateKey(users.userId, body);
    }
    async resetUserTransactionPin(body, users) {
        return await this.userService.resetTransactionPin(users.userId, body);
    }
    async sendVerificationEmail(user) {
        const getUser = await this.view(user);
        return await this.userService.requestVerifyEmail({
            firstName: getUser.firstName,
            lastName: getUser.lastName,
            email: getUser.email,
        });
    }
    async verifyEmail(params, email) {
        return await this.userService.verifyEmail({
            token: params,
            email: email,
        });
    }
    async requestResetPin(body) {
        return await this.userService.requestResetPin(body);
    }
    async resetPin(params, body) {
        return await this.userService.resetPin(Object.assign(Object.assign({}, body), { token: params }));
    }
    async updateUserTransactionPin(body, users) {
        return await this.userService.updateTransactionPin(body, users.userId);
    }
    async getUserBeneficaries(users) {
        return await this.userService.viewAllUserBeneficiaries(users.userId);
    }
    async addNewBeneficiary(users, body) {
        return await this.userService.addBeneficiary(users.userId, body);
    }
    async deleteUserBeneficiary(users, body) {
        return await this.userService.deleteBeneficiary(users.userId, body);
    }
    async getSingleBeneficiary(users, body) {
        return await this.userService.checkBeneficiary(users.userId, body);
    }
};
__decorate([
    (0, common_2.UseGuards)(guards_1.UserAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, common_1.Get)('me'),
    __param(0, (0, user_decorator_1.UserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "view", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.OK }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('auth/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LogInUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('auth/register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.CREATED }),
    (0, swagger_1.ApiOperation)({ summary: 'register a user' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignUpDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_2.UseGuards)(guards_1.UserAuthGuard),
    (0, common_1.Put)('update/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_2.UseGuards)(guards_1.UserAuthGuard),
    (0, common_1.Put)('change-pin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_pin_dto_1.ChangePinDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserPin", null);
__decorate([
    (0, common_2.UseGuards)(guards_1.UserAuthGuard),
    (0, common_1.Put)('set-transaction-pin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transaction_pin_dto_1.TransactionPinDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setUserTransactionPin", null);
__decorate([
    (0, common_2.UseGuards)(guards_1.UserAuthGuard),
    (0, common_1.Post)('validate-private-key'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [private_key_dto_1.PrivateKeyDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "validateUserPrivateKey", null);
__decorate([
    (0, common_2.UseGuards)(guards_1.UserAuthGuard),
    (0, common_1.Put)('reset-transaction-pin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_transaction_pin_dto_1.ResetTransactionPinDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetUserTransactionPin", null);
__decorate([
    (0, common_2.UseGuards)(guards_1.UserAuthGuard),
    (0, common_1.Post)('send-verification-email'),
    __param(0, (0, user_decorator_1.UserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "sendVerificationEmail", null);
__decorate([
    (0, common_1.Post)('verify/:token/:email'),
    __param(0, (0, common_1.Param)('token')),
    __param(1, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Post)('request-reset-pin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_reset_pin_dto_1.RequestResetPinDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "requestResetPin", null);
__decorate([
    (0, common_1.Post)('reset-pin/:resetToken'),
    __param(0, (0, common_1.Param)('resetToken')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reset_pin_dto_1.ResetPinDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPin", null);
__decorate([
    (0, common_2.UseGuards)(guards_1.UserAuthGuard),
    (0, common_1.Put)('change-transaction-pin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_transaction_pin_dto_1.ChangeTransactionPinDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserTransactionPin", null);
__decorate([
    (0, common_2.UseGuards)(guards_1.UserAuthGuard),
    (0, common_1.Get)('beneficaries/me'),
    __param(0, (0, user_decorator_1.UserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserBeneficaries", null);
__decorate([
    (0, common_2.UseGuards)(guards_1.UserAuthGuard),
    (0, common_1.Post)('beneficiary/new'),
    __param(0, (0, user_decorator_1.UserDecorator)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, beneficiary_dto_1.BeneficiaryDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addNewBeneficiary", null);
__decorate([
    (0, common_2.UseGuards)(guards_1.UserAuthGuard),
    (0, common_1.Put)('beneficiary/remove'),
    __param(0, (0, user_decorator_1.UserDecorator)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, beneficiary_dto_1.BeneficiaryDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUserBeneficiary", null);
__decorate([
    (0, common_2.UseGuards)(guards_1.UserAuthGuard),
    (0, common_1.Get)('beneficiary/one'),
    __param(0, (0, user_decorator_1.UserDecorator)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, beneficiary_dto_1.BeneficiaryDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getSingleBeneficiary", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map