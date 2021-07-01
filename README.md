# Etymos backend

[![GitHub activity](https://img.shields.io/github/last-commit/JuanGro/etymos-backend)](https://github.com/JuanGro/etymos-backend)
[![Github issues](https://img.shields.io/github/issues/JuanGro/etymos-backend.svg)](https://github.com/JuanGro/etymos-backend/issues)
[![GitHub languages](https://img.shields.io/github/languages/count/JuanGro/etymos-backend)](https://github.com/JuanGro/etymos-backend)
[![GitHub top language](https://img.shields.io/github/languages/top/JuanGro/etymos-backend)](https://github.com/JuanGro/etymos-backend)
[![Build Status](https://travis-ci.com/JuanGro/etymos-backend.svg?branch=master)](https://travis-ci.com/JuanGro/etymos-backend)
[![Codecov Coverage](https://img.shields.io/codecov/c/github/JuanGro/etymos-backend/coverage.svg)](https://codecov.io/gh/JuanGro/etymos-backend/)
[![Known Vulnerabilities](https://snyk.io/test/github/JuanGro/etymos-backend/badge.svg)](https://snyk.io/test/github/JuanGro/etymos-backend)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?logo=linkedin&logoColor=white)](https://mx.linkedin.com/in/juan-manuel-guerrero-hernandez)
[![GitHub followers](https://img.shields.io/github/followers/JuanGro.svg?style=social&label=Follow)](https://github.com/JuanGro?tab=followers)

_Etymos is a platform to improve the spelling through etymologies._

## Index

* [Technologies](#technologies)
* [Usage](#usage)
    * [Docker-compose](#docker-compose)
    * [Manual](#manual)
* [Tests](#tests)
* [Deployment](#deployment)
* [Contributing](#contributing)
* [License](#license)

## Technologies

[![Typescript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Apollo GraphQL](https://img.shields.io/badge/-ApolloGraphQL-311C87?logo=apollo-graphql)](https://www.apollographql.com)
[![PostgreSQL](https://img.shields.io/badge/postgres-%23316192.svg?logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![Jest](https://img.shields.io/badge/-jest-%23C21325?logo=jest&logoColor=white)](https://jestjs.io)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?logo=docker&logoColor=white)](https://www.docker.com)
[![Travis CI](https://img.shields.io/badge/travisci-%232B2F33.svg?logo=travis&logoColor=white)](https://www.travis-ci.com)
[![Postman](https://img.shields.io/badge/Postman-FF6C37?logo=postman&logoColor=white)](https://www.postman.com)

## Usage

To execute this [Node](https://nodejs.org) API, you have two alternatives, use [Docker compose](https://docs.docker.com/compose/) or run the code manually.

In both cases you must create a file called `.env` to define all the variables needed to run the app. You can see an example of this file in `.env.example`.

```bash
NODE_ENV=**Define here the environment you want to use e.g. development**
NODE_PORT=**Define here the port you want to use e.g. 3000**
PRODUCTION_ENV=**Use the same that is in the .env.example file**
DATABASE_TYPE=**Define here the database type you want to use e.g. postgres**
DATABASE_HOST=**Define here the database host you want to use**
DATABASE_PORT=**Define here the database port you want to use**
DATABASE_NAME=**Define here the database name you want to use**
DATABASE_USER=**Define here the database user you want to use**
DATABASE_PASSWORD=**Define here the database password you want to use**
SENTRY_DSN=**Define here the DSN that you Sentry account provides**
```

### [Docker-compose](https://docs.docker.com/compose/)

To run the container, you must have installed [docker](https://www.docker.com) in your machine. Only execute:

```bash
docker-compose up --build
```

### Manual

**First, you must have installed [Node](https://nodejs.org/es/) version `15`.**

Then, install the dependencies using:

```bash
npm install
```

Also, run the migrations for your database:

```bash
npm run migrate
```

Finally, use this command to run the app:

```bash
npm start
```

## Tests

To run the tests locally follow the above [manual usage](#manual) and then execute:

```bash
npm test
```

## Deployment

Still working on this section...

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[![GitHub license](https://img.shields.io/github/license/JuanGro/etymos-backend.svg)](https://github.com/JuanGro/etymos-backend/blob/master/LICENSE.md)
