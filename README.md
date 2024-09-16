# mobile-wallet-api

A wallet system API developed with NestJS, postgresql and typeorm

### This API assumes the following functionalities and constraints to enforce security and integrity

- A security private key will be generated for users on sign up
- Abilities for users to be able to fund (with either card or bank transfer) and withdraw money to their wallet using the [Flutterwave](https://flutterwave.com/us/) payment gateway.
- users will be able to perform peer to peer transactions to any of their beneficiaries and withdraw from their wallet using the transaction pin.
- during the peer to peer transaction, the sender and receiver (sender's beneficiary) will receive email notifications of the transaction.
- users can only use that security key for recovering their transaction pin.
- The security key has to be kept in an ultrasafe manner as there is no way for users to recover their account once they lose the key

- Find the API documentation [here](http://localhost:3000/docs)

### Getting Started: Install Pacakges

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

the server will be running on http://localhost:3000

### Deployed to dockerhub

- Docker repository link: https://hub.docker.com/r/jehanne123/wallet
