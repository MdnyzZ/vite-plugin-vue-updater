import { Plugin } from "vite";
import fs from "fs";
import path from "path";

export interface PluginOptions {
  fileName?: string;
  version?: string | number;
}

export function versionUpdatePlugin(options: PluginOptions = {}): Plugin {
  const fileName = options.fileName || "version.json";

  return {
    name: "vite-plugin-version-update",
    apply: "build",
    closeBundle() {
      const timestamp = Date.now();
      const content = JSON.stringify(
        {
          version: options.version || timestamp,
          timestamp: timestamp,
          releaseTime: new Date().toLocaleString(),
        },
        null,
        2,
      );

      const distPath = path.resolve(process.cwd(), "dist");
      const filePath = path.resolve(distPath, fileName);

      if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath, { recursive: true });
      }

      fs.writeFileSync(filePath, content);
      console.log(
        `\n[Updater] Generated ${fileName} with version: ${options.version || timestamp}\n`,
      );
    },
  };
}
