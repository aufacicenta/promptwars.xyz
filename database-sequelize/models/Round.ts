import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { RoundResult } from "./RoundResult";

export class Round extends Model<InferAttributes<Round>, InferCreationAttributes<Round>> {
  declare id: CreationOptional<string>;
  declare starts_at: Date;
  declare ends_at: Date;
  declare credit_cost: CreationOptional<number>;
  declare total_credits: CreationOptional<number>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  static initModel(sequelize: Sequelize): typeof Round {
    Round.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        starts_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        ends_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        credit_cost: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1,
        },
        total_credits: {
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
        tableName: "rounds",
        timestamps: true,
        underscored: true,
      },
    );
    return Round;
  }

  static associate() {
    // Define associations here
    Round.hasMany(RoundResult, { foreignKey: "round_id" });
  }

  getStatus(): "upcoming" | "active" | "completed" {
    const now = new Date();
    if (now < this.starts_at) return "upcoming";
    if (now >= this.starts_at && now < this.ends_at) return "active";
    return "completed";
  }

  async areResultsPublished(): Promise<boolean> {
    const results = await RoundResult.findAll({
      where: { round_id: this.id },
      attributes: ["user_id"],
    });
    return results.every((result) => result.user_id !== null);
  }
}
