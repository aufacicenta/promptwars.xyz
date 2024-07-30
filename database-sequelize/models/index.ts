import type { Sequelize } from "sequelize";
import { User } from "./User";
import { Credit } from "./Credit";
import { Wallet } from "./Wallet";
import { Transaction } from "./Transaction";

export { User, Credit, Wallet, Transaction };

export function initModels(sequelize: Sequelize) {
  User.initModel(sequelize);
  Credit.initModel(sequelize);
  Wallet.initModel(sequelize);
  Transaction.initModel(sequelize);

  User.associate();
  Credit.associate();
  Wallet.associate();
  Transaction.associate();

  return {
    User,
    Credit,
    Wallet,
    Transaction,
  };
}
