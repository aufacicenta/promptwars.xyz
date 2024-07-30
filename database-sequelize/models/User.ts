import { CreationOptional, DataTypes, InferCreationAttributes, InferAttributes, Model, Sequelize } from "sequelize";
import { Credit } from "./Credit";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

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
        schema: "auth",
        tableName: "users",
        sequelize,
      },
    );

    return user;
  }

  static associate() {
    User.hasMany(Credit, {
      foreignKey: "userId",
      as: "credits",
    });
  }
}
