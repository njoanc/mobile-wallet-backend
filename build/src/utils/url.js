"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.host = void 0;
const config_1 = require("@nestjs/config");
const configuration_1 = __importDefault(require("../config/configuration"));
// Initialize ConfigService
const configService = new config_1.ConfigService(configuration_1.default);
// Get the port from the config or environment, defaulting to 3000
const port = configService.get('PORT', 3000);
const host = () => {
    return `http://localhost:${port}`;
};
exports.host = host;
//# sourceMappingURL=url.js.map