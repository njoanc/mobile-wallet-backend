"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionPinNotSetException = void 0;
const common_1 = require("@nestjs/common");
class TransactionPinNotSetException extends common_1.BadRequestException {
    constructor(error) {
        super('you have not set up your transaction pin!', error);
    }
}
exports.TransactionPinNotSetException = TransactionPinNotSetException;
//# sourceMappingURL=transaction-pin-not-set.js.map