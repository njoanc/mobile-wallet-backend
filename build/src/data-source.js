"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
const ormconfig_1 = __importDefault(require("../ormconfig"));
const configService = new config_1.ConfigService();
exports.AppDataSource = new typeorm_1.DataSource((0, ormconfig_1.default)(configService));
//# sourceMappingURL=data-source.js.map