export class InvalidPayout extends Error {
	public readonly name = "InvalidPayout";

	constructor(reason: string) {
		super("Invalid payout: " + reason);
	}
}
