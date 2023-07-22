import { resolve } from "path";
import { defineConfig } from "vitest/config";

const root = resolve(__dirname);

export default defineConfig({
	test: {
		root,
		setupFiles: ["test/setup.ts"],
	},
});
