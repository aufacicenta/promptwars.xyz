import type { Sequelize } from "sequelize";
import { User } from "./User";
import { Credit } from "./Credit";
import { Wallet } from "./Wallet";

export { User, Credit, Wallet };

export function initModels(sequelize: Sequelize) {
  User.initModel(sequelize);
  Credit.initModel(sequelize);
  Wallet.initModel(sequelize);

  User.associate();
  Credit.associate();
  Wallet.associate();

  return {
    User,
    Credit,
    Wallet,
  };
}
