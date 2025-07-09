'use strict';

const now = new Date()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("records", [{
      account_id: 1,
      type: "Expenses",
      category: "Meal",
      amount: 25000,
      created_at: now
    },
    {
      account_id: 1,
      type: "Expenses",
      category: "Meal",
      amount: 25000,
      created_at: now
    }, {
      account_id: 1,
      type: "Expenses",
      category: "Meal",
      amount: 25000,
      created_at: now
    }], {})
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("records", null, {})
  }
};
