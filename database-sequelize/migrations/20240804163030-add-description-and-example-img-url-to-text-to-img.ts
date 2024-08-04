"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("text_to_img", "description", {
      type: Sequelize.TEXT,
      allowNull: false,
    });

    await queryInterface.addColumn("text_to_img", "example_img_url", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("text_to_img", "description");
    await queryInterface.removeColumn("text_to_img", "example_img_url");
  },
};
