import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { Round } from "./Round";
import { User } from "./User";

export class RoundResult extends Model<InferAttributes<RoundResult>, InferCreationAttributes<RoundResult>> {
  declare id: CreationOptional<string>;
  declare round_id: string;
  declare user_id: string | null;
  declare winner_distribution: number;
  declare credits_earned: CreationOptional<number>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  static initModel(sequelize: Sequelize): typeof RoundResult {
    RoundResult.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        round_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: true,
        },
        winner_distribution: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        credits_earned: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: "round_results",
        timestamps: true,
        underscored: true,
      },
    );
    return RoundResult;
  }

  static associate() {
    // Define associations here
    RoundResult.belongsTo(Round, { foreignKey: "round_id" });
    RoundResult.belongsTo(User, { foreignKey: "user_id" });
  }
}
