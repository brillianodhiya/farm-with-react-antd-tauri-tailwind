import { defineConfig } from "@farmfe/core";
import farmJsPluginPostcss from "@farmfe/js-plugin-postcss";
import path from "node:path";
import react from "@vitejs/plugin-react";
import jotaiDebugLabel from "jotai/babel/plugin-debug-label";
import jotaiReactRefresh from "jotai/babel/plugin-react-refresh";

export default defineConfig({
  plugins: [
    "@farmfe/plugin-react",
    farmJsPluginPostcss({
      postcssLoadConfig: {
        // load config from client/postcss.config.js
        path: path.join(process.cwd(), "client", "postcss.config.js"),
      },
    }),
  ],
  vitePlugins: [
    react({
      babel: {
        plugins: [jotaiDebugLabel, jotaiReactRefresh],
      },
    }),
  ],
  server: {
    port: 1420,
  },
});
