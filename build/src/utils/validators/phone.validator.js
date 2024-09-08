"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPhoneNumberValid = void 0;
const class_validator_1 = require("class-validator");
const libphonenumber_js_1 = require("libphonenumber-js");
let IsPhoneNumberValid = class IsPhoneNumberValid {
    validate(phoneNumber, args) {
        return (0, libphonenumber_js_1.isValidPhoneNumber)(phoneNumber); // Validate using libphonenumber-js
    }
    defaultMessage(args) {
        return 'Phone number is not valid';
    }
};
IsPhoneNumberValid = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isPhoneNumberValid', async: false })
], IsPhoneNumberValid);
exports.IsPhoneNumberValid = IsPhoneNumberValid;
//# sourceMappingURL=phone.validator.js.map