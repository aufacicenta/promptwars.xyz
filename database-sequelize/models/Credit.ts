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

export class Credit extends Model<InferAttributes<Credit>, InferCreationAttributes<Credit>> {
  declare id: CreationOptional<string>;
  declare userId: ForeignKey<User["id"]>;
  declare balance: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initModel(sequelize: Sequelize): typeof Credit {
    const credit = Credit.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          unique: true,
          defaultValue: DataTypes.UUIDV4,
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "User",
            key: "id",
          },
        },
        balance: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      {
        sequelize,
      },
    );

    return credit;
  }

  static associate() {
    Credit.belongsTo(User, {
      foreignKey: "userId",
      as: "user",
    });
  }
}
