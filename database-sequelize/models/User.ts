import { CreationOptional, DataTypes, InferCreationAttributes, InferAttributes, Model, Sequelize } from "sequelize";
import { Credit } from "./Credit";
import { Wallet } from "./Wallet";
import { Transaction } from "./Transaction";

export type UserAttributes = {
  id?: string;
  created_at?: Date;
  updated_at?: Date;
};

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  static initModel(sequelize: Sequelize): typeof User {
    const user = User.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          unique: true,
          defaultValue: DataTypes.UUIDV4,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      {
        schema: "auth",
        tableName: "users",
        sequelize,
      },
    );

    return user;
  }

  static associate() {
    User.hasMany(Credit, {
      foreignKey: "user_id",
      as: "credits",
    });
    User.hasOne(Wallet, {
      foreignKey: "user_id",
      as: "wallet",
    });
    User.hasMany(Transaction, {
      foreignKey: "user_id",
      as: "transactions",
    });
  }
}
