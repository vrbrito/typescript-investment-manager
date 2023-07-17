import { type AssetClasses } from "./asset.types";

export class Asset {
	public constructor(
		public readonly ticker: string,
		public readonly assetClass: AssetClasses,
	) {}
}
