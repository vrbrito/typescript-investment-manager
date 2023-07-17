export class InvalidPosition extends Error {
	public readonly name = "InvalidPosition";

	constructor(reason: string) {
		super("Invalid position: " + reason);
	}
}
