import fs from 'node:fs'

export const checkExtension = (filename: string): string | null => {
     const exts = [".ts", ".js", ".mjs", ".cjs"];
     const hasExt = exts.some((ext) => filename.endsWith(ext));

     if (hasExt) {
          return fs.existsSync(filename) ? "" : null;
     }

     for (const ext of exts) {
          if (fs.existsSync(filename + ext)) {
               return ext;
          }
     }

     return null;
};
