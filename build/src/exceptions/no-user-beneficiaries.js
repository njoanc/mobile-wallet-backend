"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoBeneficiariesException = void 0;
const common_1 = require("@nestjs/common");
class NoBeneficiariesException extends common_1.BadRequestException {
    constructor(error) {
        super('you have no beneficiaries at the moment!', error);
    }
}
exports.NoBeneficiariesException = NoBeneficiariesException;
//# sourceMappingURL=no-user-beneficiaries.js.map