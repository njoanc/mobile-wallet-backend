"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountNotVerifiedException = void 0;
const common_1 = require("@nestjs/common");
class AccountNotVerifiedException extends common_1.BadRequestException {
    constructor(error) {
        super('you have to verify your account before you can perform any transaction!', error);
    }
}
exports.AccountNotVerifiedException = AccountNotVerifiedException;
//# sourceMappingURL=account-not-verified.js.map