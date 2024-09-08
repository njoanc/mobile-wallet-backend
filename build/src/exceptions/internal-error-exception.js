"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalErrorException = void 0;
const common_1 = require("@nestjs/common");
class InternalErrorException extends common_1.InternalServerErrorException {
    constructor(error) {
        super('', error);
    }
}
exports.InternalErrorException = InternalErrorException;
//# sourceMappingURL=internal-error-exception.js.map