import { Type } from "class-transformer";
import { IsDate, IsDefined, IsEnum, IsPositive, MinLength, ValidateNested } from "class-validator";
import { Asset } from "../value_objects/asset";

export enum OperationTypes {
	BUY = "buy",
	SELL = "sell",
}

export const signalMap = {
	[OperationTypes.BUY]: 1,
	[OperationTypes.SELL]: -1,
};

export class TransactionInput {
	@IsDefined()
	@IsDate()
	@Type(() => Date)
	date!: Date;

	@IsDefined()
	@MinLength(3)
	owner!: string;

	@IsDefined()
	@MinLength(5)
	broker!: string;

	@IsDefined()
	@ValidateNested()
	@Type(() => Asset)
	asset!: Asset;

	@IsDefined()
	@IsEnum(OperationTypes)
	operationType!: OperationTypes;

	@IsDefined()
	@IsPositive()
	quantity!: number;

	@IsDefined()
	@IsPositive()
	unitPrice!: number;
}
