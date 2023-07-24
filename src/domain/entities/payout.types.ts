import { Type } from "class-transformer";
import { IsDate, IsDefined, IsPositive, MinLength, ValidateNested } from "class-validator";
import { Asset } from "../value_objects/asset";

export class PayoutInput {
	@IsDefined()
	@IsDate()
	@Type(() => Date)
	date!: Date;

	@IsDefined()
	@MinLength(3)
	owner!: string;

	@IsDefined()
	@MinLength(3)
	broker!: string;

	@IsDefined()
	@ValidateNested()
	@Type(() => Asset)
	asset!: Asset;

	@IsDefined()
	@IsPositive()
	amount!: number;
}
