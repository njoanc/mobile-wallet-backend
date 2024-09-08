import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsPhoneNumberValid } from '../../utils/validators/phone.validator';  // Import the validator
import { ValidationPipeOptions } from '../../utils/validators/validationPipeOptions.interface.ts';  // Import the interface

export function IsPhoneNumber(validationOptions?: ValidationPipeOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsPhoneNumberValid,
        });
    };
}
