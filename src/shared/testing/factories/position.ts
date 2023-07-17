import { Factory } from "fishery";
import { assetFactory } from "./asset";
import { Position } from "../../../domain/entities/position";

export const positionFactory = Factory.define<Position>(({ afterBuild }) => {
	afterBuild((position) => {
		position.validate();
	});

	const values = {
		asset: assetFactory.build(),
		transactions: [],
	};

	return new Position(values.asset, values.transactions);
});
