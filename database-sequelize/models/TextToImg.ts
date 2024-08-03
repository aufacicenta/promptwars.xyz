import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

export class TextToImg extends Model<InferAttributes<TextToImg>, InferCreationAttributes<TextToImg>> {
  declare id: CreationOptional<string>;
  declare provider: string;
  declare model: string;
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
}
