"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class WalletNotFoundException extends common_1.NotFoundException {
    constructor(error) {
        super('wallet not Found!', error);
    }
}
exports.WalletNotFoundException = WalletNotFoundException;
//# sourceMappingURL=wallet-not-found-exception.js.map