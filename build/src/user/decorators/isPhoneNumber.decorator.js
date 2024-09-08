"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPhoneNumber = IsPhoneNumber;
const class_validator_1 = require("class-validator");
const phone_validator_1 = require("../../utils/validators/phone.validator"); // Import the validator
function IsPhoneNumber(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: phone_validator_1.IsPhoneNumberValid,
        });
    };
}
//# sourceMappingURL=isPhoneNumber.decorator.js.map