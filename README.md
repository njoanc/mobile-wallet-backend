# mobile-wallet-api

A wallet system API developed with NestJS, PostgreSQL, and TypeORM

## This API assumes the following functionalities and constraints to enforce security and integrity

- A security private key will be generated for users on sign up
- Abilities for users to fund (with either card or bank transfer) and withdraw money to their wallet using the [Flutterwave](https://flutterwave.com/us/) payment gateway
- Users will be able to perform peer-to-peer transactions to any of their beneficiaries and withdraw from their wallet using the transaction pin
- During the peer-to-peer transaction, the sender and receiver (sender's beneficiary) will receive email notifications of the transaction
- Users can only use that security key for recovering their transaction pin
- The security key must be kept in an ultra-safe manner as there is no way for users to recover their account once they lose the key

- Find the API documentation [here](http://localhost:3000/docs)

---

## Application Architecture

The application follows a modular structure with the following components:

1. **Modules**:

   - Each module is organized by features (e.g., `UserModule`, `TransactionModule`, `AuthModule`).
   - Modules encapsulate related services, controllers, and entities to ensure separation of concerns.

2. **Controllers**:

   - Controllers handle HTTP requests and route them to the appropriate services.
   - Controllers use DTOs (Data Transfer Objects) for input validation.

3. **Services**:

   - Services contain the business logic and interact with the database through repositories.

4. **Entities**:

   - Entities represent the database schema and are defined using TypeORM decorators.
   - Migrations are generated to maintain version control of the schema.

5. **Middleware and Interceptors**:

   - Middleware for logging, authentication, and other cross-cutting concerns.
   - Interceptors are used to manage response formatting and error handling.

6. **Providers**:

   - These include custom providers such as payment gateways (e.g., `Flutterwave`) or external integrations.

7. **Tests**:
   - This folder includes all tests.

---

## Database Migrations

- Implement database migrations for version control of the database schema using TypeORM’s migration tools.
- To run migrations, use:

  ```bash
  npm run migrate
  ```

## API Documentation

- Find the API documentation [here](http://localhost:3000/docs)

## Getting Started: Install Pacakges

```bash
 npm install
```

or

```bash
 yarn
```

Then you can then finally start the development server with the command

```bash
 npm run start
```

or

```bash
 yarn start
```

### Dockerizing the development environment

use the command below to build the docker image

```bash
docker-compose up --build
```

### Running the Dev Docker container

To run the application, use the command below:

```bash
 docker-compose up
```

## Running Tests

The tests are located in the tests folder.
To run the tests, use the command:

```bash
npm run test
```

the server will be running on http://localhost:3000

### Deployed to dockerhub

- Docker repository link: https://hub.docker.com/r/jehanne123/wallet
