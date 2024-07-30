import { defineConfig } from "@farmfe/core";
import farmJsPluginPostcss from "@farmfe/js-plugin-postcss";
import path from "node:path";

export default defineConfig({
  plugins: [
    "@farmfe/plugin-react",
    farmJsPluginPostcss({
      postcssLoadConfig: {
        // load config from client/postcss.config.js
        path: path.join(process.cwd(), "client"),
      },
    }),
  ],
  server: {
    port: 1420,
  },
});
