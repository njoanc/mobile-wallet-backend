"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeneficiaryNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class BeneficiaryNotFoundException extends common_1.NotFoundException {
    constructor(error) {
        super('this user is not amongst your beneficiaries!', error);
    }
}
exports.BeneficiaryNotFoundException = BeneficiaryNotFoundException;
//# sourceMappingURL=beneficiary-not-found.js.map