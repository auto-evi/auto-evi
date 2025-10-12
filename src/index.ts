import fs from "node:fs";
import path from "node:path";

export const autoEvi = () => {
     const controllerDir = path.resolve("src/module");
     const outputPath = path.resolve("src/controllers-auto.ts"); // ✅ داخل src
     const exportStatements: string[] = [];

     if (!fs.existsSync(controllerDir)) {
          console.warn(`⚠️ Base directory not found: ${controllerDir}`);
          return;
     }

     const folders = fs.readdirSync(controllerDir);
     for (const folder of folders) {
          const folderPath = path.join(controllerDir, folder);
          if (!fs.statSync(folderPath).isDirectory()) continue;

          const files = fs.readdirSync(folderPath).filter(
               (f) => f.endsWith(".controller.ts") || f.endsWith(".controller.js")
          );

          for (const file of files) {
               const importPath = `./${path
                    .relative(path.dirname(outputPath), path.join(controllerDir, folder, file))
                    .replace(/\\/g, "/")
                    .replace(/\.(ts|js)$/, "")}`;

               const varName = `${folder}_${file
                    .replace(/\.(controller\.ts|controller\.js)$/, "")
                    .replace(/[-.]/g, "_")}`;

               exportStatements.push(`export * as ${varName} from "${importPath}";`);
          }
     }

     const newContent = exportStatements.join("\n");
     const oldContent = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, "utf-8") : "";

     if (newContent.trim() !== oldContent.trim()) {
          fs.writeFileSync(outputPath, newContent, "utf-8");
          console.log(`✅ Controllers index updated at: ${outputPath}`);
     } else {
          console.log("✅ Controllers index already up to date.");
     }
};
