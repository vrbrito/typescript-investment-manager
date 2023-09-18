import { AppDataSource } from "./data-source";
import { AssetModel } from "./models/asset";
import { PayoutModel } from "./models/payout";
import { TransactionModel } from "./models/transaction";

AppDataSource.initialize()
	.then(async () => {
		console.log("Loading objects from the database...");

		const transactions = await AppDataSource.manager.find(TransactionModel);
		const payouts = await AppDataSource.manager.find(PayoutModel);
		const assets = await AppDataSource.manager.find(AssetModel);

		const repo = AppDataSource.getRepository(TransactionModel);
		const obj = repo.create({ owner: "Math" });
		await repo.save(obj);

		console.log(obj);

		console.log("Loaded transactions: ", transactions);
		console.log("Loaded payouts: ", payouts);
		console.log("Loaded assets: ", assets);
	})
	.catch((error) => {
		console.log(error);
	});
