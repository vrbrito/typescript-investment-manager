import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "../../../domain/entities/transaction";
import { OperationTypes } from "../../../domain/entities/transaction.types";
import { AssetModel } from "./asset";

@Entity("transactions")
export class TransactionModel {
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

	@Column({
		type: "enum",
		enum: OperationTypes,
	})
	operationType!: OperationTypes;

	@Column("int")
	quantity!: number;

	@Column("double precision")
	unitPrice!: number;

	public toEntity(): Transaction {
		return new Transaction(
			new Date(this.date),
			this.owner,
			this.broker,
			this.asset.toEntity(),
			this.operationType,
			this.quantity,
			this.unitPrice,
		);
	}
}
