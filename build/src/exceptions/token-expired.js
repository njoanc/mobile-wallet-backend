"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenExpiredException = void 0;
const common_1 = require("@nestjs/common");
class TokenExpiredException extends common_1.BadRequestException {
    constructor(error) {
        super('', error);
    }
}
exports.TokenExpiredException = TokenExpiredException;
//# sourceMappingURL=token-expired.js.map