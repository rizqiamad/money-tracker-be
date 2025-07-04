'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("records", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      account_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "accounts", key: "id" }
      },
      type: {
        type: Sequelize.ENUM(["Expenses", "Income"]),
        allowNull: false
      },
      category: {
        type: Sequelize.ENUM(["Equipment", "Lifestyle", "Meal", "Residence", "Transportation", "Internet", "ETC", "Charity", "Freelance", "Salary", "Health", "Investment"]),
        allowNull: false
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("records")
  }
};
