"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class TransactionNotFoundException extends common_1.NotFoundException {
    constructor(error) {
        super('Transaction not found!', error);
    }
}
exports.TransactionNotFoundException = TransactionNotFoundException;
//# sourceMappingURL=transaction-notfound.js.map