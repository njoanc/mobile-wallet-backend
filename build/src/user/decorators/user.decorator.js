"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDecorator = void 0;
const common_1 = require("@nestjs/common");
exports.UserDecorator = (0, common_1.createParamDecorator)((data, ctx) => {
    const { user } = ctx.switchToHttp().getRequest();
    return user;
});
//# sourceMappingURL=user.decorator.js.map