import { Factory } from "fishery";
import { Payout } from "../../../domain/entities/payout";
import { assetFactory } from "./asset";

export const payoutFactory = Factory.define<Payout>(({ afterBuild }) => {
	afterBuild((payout) => {
		payout.validate();
	});

	const values = {
		date: new Date(),
		owner: "Dummy",
		broker: "Bank",
		asset: assetFactory.build(),
		amount: 10,
	};

	return new Payout(values.date, values.owner, values.broker, values.asset, values.amount);
});
