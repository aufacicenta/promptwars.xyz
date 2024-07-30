"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("wallets", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: Sequelize.UUIDV4,
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
      ethereum_address: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Add unique index on ethereum_address
    await queryInterface.addIndex("wallets", ["ethereum_address"], {
      unique: true,
      name: "idx_wallets_ethereum_address",
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop the unique index on ethereum_address
    await queryInterface.removeIndex("wallets", "idx_wallets_ethereum_address");

    await queryInterface.dropTable("wallets");
  },
};
