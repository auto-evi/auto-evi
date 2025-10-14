# 🧩 Swagger EVI Auto Generator

This script automatically generates **Swagger JSDoc comments** (`swagger.evi.ts`) by scanning your Express router files.
It detects all HTTP routes (`get`, `post`, `put`, etc.) inside your project’s module directories and produces a ready-to-use Swagger doc block for each route.

---

## Features

* Scans your `src/module`, `src`, or `src/router` directories automatically.
* Detects Express route definitions such as:

  ```ts
  router.get('/users', userController);
  router.post('/login', loginController);
  ```
* Generates a complete Swagger doc comment for each route.
* Writes the documentation to a single file:

  ```
  src/swagger.evi.ts
  ```
* Automatically tags each route by its module name.
* Ignores folders that are not valid Express modules.
* Safe to use with `nodemon` — won’t cause restart loops.

---

## Installation

No external dependencies are needed.
Just ensure you’re using **Node.js v16+**.

```bash
npm install
```

or with **pnpm**:

```bash
pnpm install
```

---

## Usage

### Add the script file

Save your code in a file called:

```
scripts/swagger_evi.ts
```

or directly in:

```
src/utils/swagger_evi.ts
```

### Import and run it

You can execute it manually or automatically at startup.

#### Example (manual trigger)

```ts
import { swagger_evi } from "./src/utils/swagger_evi";

swagger_evi("/api/v1");
```

#### Example (auto-run on startup)

In your main server file (`app.ts` or `server.ts`):

```ts
import { swagger_evi } from "./src/utils/swagger_evi";

swagger_evi("/api/v1");
```

---

## How it works

1. The script looks for any of these directories:

   * `src/module`
   * `src`
   * `src/router`

2. It searches for files ending with:

   ```
   *.controller.ts, *.controller.js, *.module.ts, *.module.js
   ```

3. It parses route declarations like:

   ```ts
   router.get('/example', exampleController);
   ```

4. For each route, it generates a Swagger block similar to:

   ```ts
   /**
   * @swagger
   * /api/v1/example:
   *   get:
   *     summary: GET /api/v1/example
   *     tags: [Example]
   *     responses:
   *       200:
   *         description: Successful response
   */
   ```

5. It then writes everything into `src/swagger.evi.ts`.

---

## Example Output

After running the script, `src/swagger.evi.ts` will look like:

```ts
// Auto-generated Swagger documentation
// DO NOT EDIT MANUALLY

// ### user/user.controller.ts ###
/**
* @swagger
* /api/v1/user/login:
*   post:
*     summary: POST /api/v1/user/login
*     tags: [User]
*     responses:
*       200:
*         description: Successful response
*/
```
