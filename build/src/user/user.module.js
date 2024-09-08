"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const email_entity_1 = require("./entities/email.entity");
const auth_module_1 = require("../auth/auth.module");
const mail_module_1 = require("../mail/mail.module");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, email_entity_1.Email]),
            user_entity_1.User,
            email_entity_1.Email,
            mail_module_1.MailModule,
        ],
        controllers: [user_controller_1.UserController],
        exports: [typeorm_1.TypeOrmModule, user_service_1.UserService],
        providers: [user_service_1.UserService, user_entity_1.User, email_entity_1.Email],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map