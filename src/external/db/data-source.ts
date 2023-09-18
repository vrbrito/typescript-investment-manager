import config from "config";
import path from "path";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { type DbConfig } from "../../../config/config.types";

const dbConfig = config.get<DbConfig>("Db");

export const AppDataSource = new DataSource({
	type: "postgres",
	host: dbConfig.host,
	port: dbConfig.port,
	username: dbConfig.user,
	password: dbConfig.password,
	database: dbConfig.db,
	synchronize: false,
	logging: false,
	entities: [path.join(__dirname, "external/db/models/*.{.ts,.js}")],
	migrations: [path.join(__dirname, "external/db/migrations/*/*.{.ts,.js}")],
	migrationsTableName: "migrations",
});
