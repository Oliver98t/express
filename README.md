# Express + Prisma Template

TypeScript Express API template with Prisma ORM, PostgreSQL, and Jest tests.

## Tech Stack

- Node.js + TypeScript
- Express
- Prisma ORM
- PostgreSQL (Docker)
- Jest (`unit` + `integration` projects)

## Project Layout

```text
app/
	app.ts
	bin/www.ts
	database/
	routes/
	services/
	prisma/
	Jest/
	docker-compose.yml
	docker-compose.test.yml
	dockerfile
```

## Prerequisites

- Docker + Docker Compose

Optional (only if you run outside Docker):
- Node.js 20+
- npm

## Run Locally (Docker)

From the `app/` directory:

```bash
docker compose up --build -d
docker compose exec express-app npx prisma migrate dev --name init
docker compose exec express-app npx prisma generate
docker compose exec -d express-app npm start
```

API is available at:
- `http://localhost:3001`

Health check:

```bash
curl http://localhost:3001/
```

Expected response:

```json
{"status":"up"}
```

## Test Environment (Docker)

From the `app/` directory:

```bash
docker compose -f docker-compose.test.yml up --build -d
docker compose -f docker-compose.test.yml exec test-express-app npx prisma migrate dev --name init
docker compose -f docker-compose.test.yml exec test-express-app npx prisma generate
docker compose -f docker-compose.test.yml exec -d test-express-app npm start
docker compose -f docker-compose.test.yml exec test-express-app npx tsx populateDB.ts
docker compose -f docker-compose.test.yml exec test-express-app npm run test
```

## NPM Scripts

Run from `app/`:

- `npm start` – start server on port `3001`
- `npm run dev` – start server in watch mode
- `npm run test` – run all Jest projects
- `npm run test:unit` – run unit tests only
- `npm run test:integration` – run integration tests only

## API Routes

### Root
- `GET /` → `{ "status": "up" }`

### User
- `GET /user`
- `GET /user/:id`
- `POST /user`
- `PUT /user/:id`
- `DELETE /user/:id`
- `GET /user/get_email/:email`

### Item
- `GET /item`
- `GET /item/:id`
- `POST /item`
- `PUT /item/:id`
- `DELETE /item/:id`

## Environment Variables

For local Docker (`docker-compose.yml`), `.env` should include:

```env
DATABASE_URL="postgresql://oli98:password@postgres:5432/expressdb?schema=public"
```

For test Docker (`docker-compose.test.yml`), `DATABASE_URL` is set at service level.

## CI

CI workflow is in `.github/workflows/ci.yml` and runs:

1. `docker compose -f docker-compose.test.yml up --build -d`
2. Prisma migration + client generation inside container
3. App start in background
4. Test DB population
5. Unit + integration tests

## Stop and Clean Up

From `app/`:

```bash
docker compose down
docker compose -f docker-compose.test.yml down
```