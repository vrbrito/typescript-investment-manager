export interface AppConfig {
	port: number;
}

export interface DbConfig {
	host: string;
	user: string;
	password: string;
	db: string;
	port: number;
}

export interface Config {
	App: AppConfig;
	Db: DbConfig;
}
