"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsufficientTokensException = void 0;
const common_1 = require("@nestjs/common");
class InsufficientTokensException extends common_1.BadRequestException {
    constructor(error) {
        super('insufficient funds you must have at least 100 tokens in your wallet', error);
    }
}
exports.InsufficientTokensException = InsufficientTokensException;
//# sourceMappingURL=insufficient-tokens.js.map