import type { Sequelize } from "sequelize";
import { User } from "./User";
import { Credit } from "./Credit";

export { User, Credit };

export function initModels(sequelize: Sequelize) {
  User.initModel(sequelize);
  Credit.initModel(sequelize);

  User.associate();
  Credit.associate();

  return {
    User,
    Credit,
  };
}
