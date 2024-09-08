"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletModule = void 0;
const common_1 = require("@nestjs/common");
const wallet_controller_1 = require("./wallet.controller");
const wallet_service_1 = require("./wallet.service");
const wallet_entity_1 = require("./entities/wallet.entity");
const typeorm_1 = require("@nestjs/typeorm");
const transaction_module_1 = require("../transaction/transaction.module");
const user_module_1 = require("../user/user.module");
const auth_module_1 = require("../auth/auth.module");
const mail_module_1 = require("../mail/mail.module");
const listeners_1 = require("./listeners");
let WalletModule = class WalletModule {
};
exports.WalletModule = WalletModule;
exports.WalletModule = WalletModule = __decorate([
    (0, common_1.Module)({
        controllers: [wallet_controller_1.WalletController],
        providers: [wallet_service_1.WalletService, wallet_entity_1.Wallet, listeners_1.PeerToPeerEventListener],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([wallet_entity_1.Wallet]),
            (0, common_1.forwardRef)(() => transaction_module_1.TransactionModule),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            mail_module_1.MailModule,
        ],
        exports: [wallet_service_1.WalletService, wallet_entity_1.Wallet],
    })
], WalletModule);
//# sourceMappingURL=wallet.module.js.map