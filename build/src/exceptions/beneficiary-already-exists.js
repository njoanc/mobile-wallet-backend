"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeneficiaryAlreadyAddedException = void 0;
const common_1 = require("@nestjs/common");
class BeneficiaryAlreadyAddedException extends common_1.BadRequestException {
    constructor(error) {
        super('this beneficiary has already been added!', error);
    }
}
exports.BeneficiaryAlreadyAddedException = BeneficiaryAlreadyAddedException;
//# sourceMappingURL=beneficiary-already-exists.js.map