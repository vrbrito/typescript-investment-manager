import config from "config";
import { beforeAll } from "vitest";
import { type AppConfig } from "../config/config.types";
import { SetupServer } from "../src/external/server/index";

const appConfig = config.get<AppConfig>("App");

beforeAll(() => {
	const server = new SetupServer(appConfig.port);
	server.init();

	global.app = server.getApp();
});
