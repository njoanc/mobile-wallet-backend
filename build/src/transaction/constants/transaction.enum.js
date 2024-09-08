"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionStatus = exports.TransactionType = void 0;
var TransactionType;
(function (TransactionType) {
    TransactionType["DEBIT"] = "DEBIT";
    TransactionType["CREDIT"] = "CREDIT";
    TransactionType["PEER_TRANSFER"] = "PEER-TRANSFER";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["PENDING"] = "PENDING";
    TransactionStatus["SUCCESS"] = "SUCCESS";
    TransactionStatus["FAILED"] = "FAILED";
})(TransactionStatus = exports.TransactionStatus || (exports.TransactionStatus = {}));
//# sourceMappingURL=transaction.enum.js.map