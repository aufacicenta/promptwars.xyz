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

export class Transaction extends Model<InferAttributes<Transaction>, InferCreationAttributes<Transaction>> {
  declare id: CreationOptional<string>;
  declare user_id: ForeignKey<User["id"]>;
  declare amount: number;
  declare type: "deposit" | "card_payment";
  declare status: "pending" | "completed" | "failed";
  declare provider_tx_id: CreationOptional<string>;
  declare provider_name: CreationOptional<string>;
  declare currency: CreationOptional<string>;
  declare payment_method_type: CreationOptional<string>;
  declare last4: CreationOptional<string>;
  declare error_code: CreationOptional<string>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  static initModel(sequelize: Sequelize): typeof Transaction {
    return Transaction.init(
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
        amount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        type: {
          type: DataTypes.ENUM("deposit", "card_payment"),
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM("pending", "completed", "failed"),
          allowNull: false,
          defaultValue: "pending",
        },
        provider_tx_id: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        provider_name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        currency: {
          type: DataTypes.STRING(3),
          allowNull: true,
        },
        payment_method_type: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        last4: {
          type: DataTypes.STRING(4),
          allowNull: true,
        },
        error_code: {
          type: DataTypes.STRING,
          allowNull: true,
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
        tableName: "transactions",
        timestamps: false,
      },
    );
  }

  static associate() {
    Transaction.belongsTo(User, {
      foreignKey: "user_id",
      as: "user",
      targetKey: "id",
    });
  }
}
