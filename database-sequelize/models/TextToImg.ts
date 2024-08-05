import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

export type TextToImgAttributes = {
  id?: string;
  provider: string;
  model: string;
  description: string;
  example_img_url: string;
  created_at?: Date;
  updated_at?: Date;
};

export class TextToImg
  extends Model<InferAttributes<TextToImg>, InferCreationAttributes<TextToImg>>
  implements TextToImgAttributes
{
  declare id: CreationOptional<string>;
  declare provider: string;
  declare model: string;
  declare description: string;
  declare example_img_url: string;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  static initModel(sequelize: Sequelize): typeof TextToImg {
    TextToImg.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        provider: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        model: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        example_img_url: {
          type: DataTypes.STRING,
          allowNull: false,
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
        tableName: "text_to_img",
        timestamps: false,
        underscored: true,
      },
    );

    return TextToImg;
  }

  static associate() {
    // Define associations here
  }

  getModelName(): string | null {
    const match = this.model.match(/^(.+?)(?=:)/);
    return match ? match[1] : null;
  }
}
