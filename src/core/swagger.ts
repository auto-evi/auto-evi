import fs from "node:fs";
import path from "node:path";

const ROUTE_REGEX = /router\.(get|post|put|delete|patch|options|head)\(['"`]([^'"`]*)['"`]/g;

export const swagger_evi = (api_path: string) => {

     const candidateBaseDirs = ["src/module", "src", "src/router"];
     const resolvedBaseDir = candidateBaseDirs.find((p) => fs.existsSync(p)) || "src/module";

     const baseDir = path.resolve(resolvedBaseDir);
     const outputPath = path.resolve("src/swagger.auto-evi.ts");

     if (!fs.existsSync(baseDir)) {
          return;
     }

     const modules = fs.readdirSync(baseDir);
     const swaggerDocs: string[] = [];

     for (const moduleName of modules) {
          const modulePath = path.join(baseDir, moduleName);
          if (!fs.statSync(modulePath).isDirectory()) continue;

          const files = fs.readdirSync(modulePath).filter((file) =>
               file.match(/\.(controller|module)\.(ts|js)$/)
          );

          for (const file of files) {
               const filePath = path.join(modulePath, file);
               const content = fs.readFileSync(filePath, "utf8");

               const matches = [...content.matchAll(ROUTE_REGEX)];
               if (!matches.length) continue;

               swaggerDocs.push(`\n// ### ${moduleName}/${file}###\n`);

               for (const match of matches) {
                    const method = match[1];
                    const routePath = match[2] || "/";
                    const apiPath = `${api_path}/${moduleName}${routePath.startsWith("/") ? routePath : `/${routePath}`}`;

                    const swaggerComment = `/**
* @swagger
* ${apiPath}:
*   ${method}:
*     summary: ${method.toUpperCase()} ${apiPath}
*     tags: [${capitalize(moduleName)}]
*     responses:
*       200:
*         description: Successful response
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 code:
*                   type: integer
*                   example: 200
*                 status:
*                   type: string
*                   example: "OK"
*       400:
*         description: Validation error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/ErrorResponse'
*       500:
*         description: Internal server error
*/`;

                    swaggerDocs.push(swaggerComment);
               }
          }
     }

     if (swaggerDocs.length === 0) {
          return;
     }

     const finalContent = `// Auto-generated Swagger documentation\n// DO NOT EDIT MANUALLY\n\n${swaggerDocs.join("\n\n")}\n`;

     fs.writeFileSync(outputPath, finalContent, "utf8");
};

function capitalize(str: string) {
     return str.charAt(0).toUpperCase() + str.slice(1);
}
