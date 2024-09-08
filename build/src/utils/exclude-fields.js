"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludeFields = void 0;
/// utility function to exclude certain fields that should not be shown to the client
const excludeFields = (fields, objects) => {
    const exclude = new Set(fields);
    const result = Object.fromEntries(Object.entries(objects).filter((e) => !exclude.has(e[0])));
    return result;
};
exports.excludeFields = excludeFields;
//# sourceMappingURL=exclude-fields.js.map