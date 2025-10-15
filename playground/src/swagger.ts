import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { swagger_evi } from "./lib";

const options: swaggerJsdoc.Options = {
     definition: {
          openapi: "3.0.0",
          info: {
               title: "My API Docs",
               version: "1.0.0",
               description: "API documentation for my project",
          },
          servers: [
               {
                    url: "http://localhost:3000/",
                    description: "Local URL",
               },
          ],
     },
     apis: [
          './src/module/**/*.route.js',
          './src/module/**/*.swagger.ts',
     ],
     routes: [
          './src/module',
          './src/route'
     ]
};

const swaggerSpec = swaggerJsdoc(options)
swagger_evi(options?.routes)

export function setupSwagger(app: Express): void {
     app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
     console.log("📄 Swagger docs available at:", process.env.NODE_ENV === "development" ? `${String(process.env.SITE_API_Local_URL)}/api-docs` : `${String(process.env.SITE_API_URL)}/api-docs`);
}
