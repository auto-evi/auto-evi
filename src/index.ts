import { Application, Router } from "express";
import fs from "node:fs";
import path from "node:path";

export const autoConnect = (app: Application) => {
  const moduleDir = path.resolve("src/module");

  if (!fs.existsSync(moduleDir)) {
    return;
  }
  loadRoutes(app, moduleDir);
};

const loadRoutes = (app: any, dir: string) => {
    const folders = fs.readdirSync(dir);

    for (const folder of folders) {
      const folderPath = path.join(dir, folder);
      const stat = fs.statSync(folderPath);

      if (stat.isDirectory()) {
        loadRoutes(app, folderPath);
      } else if (folder.endsWith(".route.ts") || folder.endsWith(".route.js")) {
        try {
          const routeModule = require(path.join(dir, folder));
          const router: Router = routeModule.default;

          if (router && router instanceof Router) {
            const routeName = "/" + path.basename(folder, path.extname(folder)).replace(".route", "");
            app.use(routeName, router);
          } else {
               return
          }
        } catch (err) {
          console.error(`❌ Failed to load route ${folder}:`, err);
        }
      }
    }
  };
