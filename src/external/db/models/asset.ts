import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Asset } from "../../../domain/value_objects/asset";
import { AssetClasses } from "../../../domain/value_objects/asset.types";

@Entity("assets")
@Unique(["ticker"])
export class AssetModel {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("uuid")
	uid!: string;

	@Column("varchar")
	ticker!: string;

	@Column({
		type: "enum",
		enum: AssetClasses,
	})
	assetClass!: AssetClasses;

	public toEntity(): Asset {
		return new Asset(this.ticker, this.assetClass);
	}
}
