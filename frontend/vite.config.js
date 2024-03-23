import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import constants from "./src/modules/constants.mjs";
import vue from "@vitejs/plugin-vue";

const lightTheme = constants.LIGHT_THEME;
const darkTheme = constants.DARK_THEME;

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        viteStaticCopy({
            targets: [
                {
                    src: `node_modules/primevue/resources/themes/${lightTheme}`,
                    dest: "../public/themes",
                },
                {
                    src: `node_modules/primevue/resources/themes/${darkTheme}`,
                    dest: "../public/themes",
                },
            ],
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
