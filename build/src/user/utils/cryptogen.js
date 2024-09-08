"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateAddressWalletKey = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const coinkey = require('coinkey');
class GenerateAddressWalletKey {
    static generateAddressAndKey() {
        const coinKeyInstance = coinkey.createRandom();
        return {
            privateKey: coinKeyInstance.privateKey.toString('hex'),
        };
    }
}
exports.GenerateAddressWalletKey = GenerateAddressWalletKey;
//# sourceMappingURL=cryptogen.js.map