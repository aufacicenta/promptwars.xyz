import type { Sequelize } from "sequelize";
import { User } from "./User";
import { Credit } from "./Credit";
import { Wallet } from "./Wallet";
import { Transaction } from "./Transaction";
import { Round } from "./Round";
import { RoundResult } from "./RoundResult";
import { Prompt } from "./Prompt";
import { TextToImg } from "./TextToImg";

export { User, Credit, Wallet, Transaction, Round, RoundResult, Prompt, TextToImg };

export function initModels(sequelize: Sequelize) {
  User.initModel(sequelize);
  Credit.initModel(sequelize);
  Wallet.initModel(sequelize);
  Transaction.initModel(sequelize);
  Round.initModel(sequelize);
  RoundResult.initModel(sequelize);
  Prompt.initModel(sequelize);
  TextToImg.initModel(sequelize);

  User.associate();
  Credit.associate();
  Wallet.associate();
  Transaction.associate();
  Round.associate();
  RoundResult.associate();
  Prompt.associate();
  TextToImg.associate();

  return {
    User,
    Credit,
    Wallet,
    Transaction,
    Round,
    RoundResult,
    Prompt,
    TextToImg,
  };
}
