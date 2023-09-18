import config from "config";
import "reflect-metadata";
import { afterAll, beforeAll } from "vitest";
import { type AppConfig } from "../config/config.types";
import { AppDataSource } from "../src/external/db/data-source";
import { SetupServer } from "../src/external/server/index";

const appConfig = config.get<AppConfig>("App");

beforeAll(async () => {
	const server = new SetupServer(appConfig.port);
	server.init();

	await AppDataSource.initialize();

	global.app = server.getApp();

	// @ts-expect-error Overrides dependencies type to make it specific for tests
	global.dependencies = server.dependencies;
});

afterAll(async () => {
	await AppDataSource.destroy();
});
