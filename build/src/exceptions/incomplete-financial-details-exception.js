"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncompleteFinancialDetailsExceptions = void 0;
const common_1 = require("@nestjs/common");
class IncompleteFinancialDetailsExceptions extends common_1.BadRequestException {
    constructor(error) {
        super('your financial details are not complete, please update your profile!', error);
    }
}
exports.IncompleteFinancialDetailsExceptions = IncompleteFinancialDetailsExceptions;
//# sourceMappingURL=incomplete-financial-details-exception.js.map