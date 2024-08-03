import {
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  Sequelize,
  ForeignKey,
} from "sequelize";
import { User } from "./User";

export class Wallet extends Model<InferAttributes<Wallet>, InferCreationAttributes<Wallet>> {
  declare id: CreationOptional<string>;
  declare user_id: ForeignKey<User["id"]>;
  declare ethereum_address: string;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  static initModel(sequelize: Sequelize): typeof Wallet {
    return Wallet.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          unique: true,
          defaultValue: DataTypes.UUIDV4,
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: {
              tableName: "users",
              schema: "auth",
            },
            key: "id",
          },
        },
        ethereum_address: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
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
        sequelize,
        tableName: "wallets",
        timestamps: false,
      },
    );
  }

  static associate() {
    Wallet.belongsTo(User, {
      foreignKey: "user_id",
      as: "user",
      targetKey: "id",
    });
  }
}
