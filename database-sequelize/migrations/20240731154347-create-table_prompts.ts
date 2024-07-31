"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("prompts", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: "users",
            schema: "auth",
          },
          key: "id",
        },
      },
      round_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "rounds",
          key: "id",
        },
      },
      text_to_img_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "text_to_img",
          key: "id",
        },
      },
      prompt_text: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      negative_prompt: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      similarity_score: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("prompts");
  },
};
