"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncorrectCredentialsException = void 0;
const common_1 = require("@nestjs/common");
class IncorrectCredentialsException extends common_1.UnauthorizedException {
    constructor(error) {
        super('', error);
    }
}
exports.IncorrectCredentialsException = IncorrectCredentialsException;
//# sourceMappingURL=incorrect-creds.js.map