"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannotAddSelfException = void 0;
const common_1 = require("@nestjs/common");
class CannotAddSelfException extends common_1.BadRequestException {
    constructor(error) {
        super('you cannot add yourself as a beneficiary!', error);
    }
}
exports.CannotAddSelfException = CannotAddSelfException;
//# sourceMappingURL=cannot-add-beneficiary.js.map