<h1 align="center">⭐ Github Repo Tracker ⭐</h1>

<p align="center">
  <img src="https://img.shields.io/badge/22.14.0-white?logo=node.js&logoColor=white&label=Node.js&labelColor=5FA04E" />
  <img src="https://img.shields.io/badge/^19-white?logo=react&logoColor=white&label=React&labelColor=61DAFB" />
  <img src="https://img.shields.io/badge/15.3.1-white?logo=next.js&label=Next.js&labelColor=black" />
  <img src="https://img.shields.io/badge/11.0.1-white?logo=nestjs&label=Nest.js&labelColor=E0234E" />
  <img src="https://img.shields.io/github/license/edvein-rin/who-wants-to-be-a-millionaire.svg?color=white" />
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

With default `.env.example` envs:

[127.0.0.1:3000](127.0.0.1:3000) — Client  
[127.0.0.1:5000](127.0.0.1:5000) — Server  
[127.0.0.1:5432](127.0.0.1:5432) — DB  
[127.0.0.1:5050](127.0.0.1:5050) — pgAdmin
