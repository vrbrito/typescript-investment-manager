import { IsDefined, IsEnum, MaxLength, MinLength } from "class-validator";
import { AssetClasses } from "./asset.types";

export class Asset {
	@IsDefined()
	@MinLength(3)
	@MaxLength(5)
	public readonly ticker: string;

	@IsDefined()
	@IsEnum(AssetClasses)
	public readonly assetClass: AssetClasses;

	public constructor(ticker: string, assetClass: AssetClasses) {
		this.ticker = ticker;
		this.assetClass = assetClass;
	}
}
