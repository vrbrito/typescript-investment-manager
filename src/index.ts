import config from "config";
import "reflect-metadata";
import { type AppConfig } from "../config/config.types";
import { SetupServer } from "./external/server";

const appConfig = config.get<AppConfig>("App");

const main = (): void => {
	const server = new SetupServer(appConfig.port);
	server.init();
	server.start();
};

main();
