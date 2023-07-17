export class InvalidTransaction extends Error {
	public readonly name = "InvalidTransaction";

	constructor(reason: string) {
		super("Invalid transaction: " + reason);
	}
}
