import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AssetModel } from "./asset";

@Entity("payouts")
export class PayoutModel {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("uuid")
	uid!: string;

	@Column("date")
	date!: string;

	@Column("varchar")
	owner!: string;

	@Column("varchar")
	broker!: string;

	@ManyToOne(() => AssetModel, { cascade: true })
	asset!: AssetModel;

	@Column("double precision")
	amount!: number;
}
