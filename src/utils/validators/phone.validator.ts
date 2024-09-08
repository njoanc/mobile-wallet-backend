import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { isValidPhoneNumber } from 'libphonenumber-js';

@ValidatorConstraint({ name: 'isPhoneNumberValid', async: false })
export class IsPhoneNumberValid implements ValidatorConstraintInterface {
    validate(phoneNumber: string, args: ValidationArguments) {
        return isValidPhoneNumber(phoneNumber);  // Validate using libphonenumber-js
    }

    defaultMessage(args: ValidationArguments) {
        return 'Phone number is not valid';
    }
}
