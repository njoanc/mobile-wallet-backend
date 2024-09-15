import { SignUpDto } from '../../src/user/dto/signup.dto';
import { faker } from '@faker-js/faker';

// Factory function for generating a new SignUpDto
export function createUserFactory(overrides = {}): SignUpDto {
  const user = new SignUpDto();
  user.email = faker.internet.email();
  user.pin = faker.person.suffix();
  user.firstName = faker.person.firstName();
  user.lastName = faker.person.lastName();
  user.phone = faker.phone.number();
  user.deviceId = faker.person.suffix();

  return { ...user, ...overrides }; // Allow overrides if needed
}
