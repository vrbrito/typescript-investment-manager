import { AssetClasses } from "./asset.types";

export class Asset {
  public readonly ticker: string;
  public readonly assetClass: AssetClasses;

  public constructor(ticker: string, assetClass: AssetClasses) {
    this.ticker = ticker;
    this.assetClass = assetClass;
  }
}
