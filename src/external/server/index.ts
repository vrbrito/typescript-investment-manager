import { Server } from "@overnightjs/core";
import bodyParser from "body-parser";
import { type Application } from "express";

export class SetupServer extends Server {
	public constructor(private readonly port = 3000) {
		super();
	}

	public init(): void {
		this.setupExpress();
	}

	private setupExpress(): void {
		this.app.use(bodyParser.json());
	}

	public getApp(): Application {
		return this.app;
	}

	public start(): void {
		this.app.listen(this.port, () => {
			console.info("Server listening on port:", this.port);
		});
	}
}
