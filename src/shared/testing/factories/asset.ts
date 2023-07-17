import { Factory } from "fishery";
import { type Asset } from "../../../domain/value_objects/asset";
import { AssetClasses } from "../../../domain/value_objects/asset.types";

export const assetFactory = Factory.define<Asset>(() => ({
	ticker: "ITSA4",
	assetClass: AssetClasses.ACOES,
}));
