"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataConflictException = void 0;
const common_1 = require("@nestjs/common");
class DataConflictException extends common_1.ConflictException {
    constructor(error) {
        super('', error);
    }
}
exports.DataConflictException = DataConflictException;
//# sourceMappingURL=conflict-exceptions.js.map