<h1 align="center">⭐ Github Repo Tracker ⭐</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-22.14.0-green" />
  <img src="https://img.shields.io/badge/React-^19-blue" />
  <img src="https://img.shields.io/badge/Next.js-15.3.1-white" />
  <img src="https://img.shields.io/badge/Nest.js-11.0.1-red" />
  <img src="https://img.shields.io/github/license/edvein-rin/who-wants-to-be-a-millionaire.svg?color=blue" />
<p>

<p align="center">
A studying project for viewing public projects on Github.
</p>

## Stack

- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Frameworks:** [Next.js](https://nextjs.org/), [Nest.js](https://nestjs.com/)
- **DB:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [TypeORM](https://typeorm.io/)
- **CI/CD**: [Docker](https://www.docker.com/)

## Requirements

[Docker](https://docs.docker.com/engine/install/). That's it :3

## Setup

Set envs in `.env` or just copy from `.env.example`.

Most of them are self explanatory:

```
MODE - [development | production | test]

POSTGRES_HOST
POSTGRES_PORT
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DATABASE

PG_ADMIN_PORT

SERVER_PORT
SERVER_JWT_SECRET
SERVER_JWT_EXPIRATION_TIME - expressed in seconds or a string describing a time span (zeit/ms)
SERVER_CLIENT_URL

CLIENT_PORT
CLIENT_SERVER_URL
```

## Run

```bash
docker compose up -d
```
