import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes } from "sequelize";
import { Round } from "./Round";
import { User } from "./User";
import { TextToImg } from "./TextToImg";

export class Prompt extends Model<InferAttributes<Prompt>, InferCreationAttributes<Prompt>> {
  declare id: string;
  declare user_id: string;
  declare round_id: string;
  declare text_to_img_id: string;
  declare prompt_text: string;
  declare negative_prompt: string | null;
  declare image_url: string;
  declare similarity_score: number | null;
  declare created_at: Date;
  declare updated_at: Date;

  static initModel(sequelize: Sequelize): typeof Prompt {
    Prompt.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        round_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        text_to_img_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        prompt_text: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        negative_prompt: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        image_url: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        similarity_score: {
          type: DataTypes.FLOAT,
          allowNull: true,
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
        tableName: "prompts",
        timestamps: true,
        underscored: true,
      },
    );
    return Prompt;
  }

  static associate() {
    // Define associations here
    Prompt.belongsTo(Round, { foreignKey: "round_id" });
    Prompt.belongsTo(User, { foreignKey: "user_id" });
    Prompt.belongsTo(TextToImg, { foreignKey: "text_to_img_id" });
  }
}
