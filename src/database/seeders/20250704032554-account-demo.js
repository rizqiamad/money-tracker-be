'use strict';

const now = new Date()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("accounts", [{
      user_id: 1,
      account_name: "BCA",
      total_balance: 2000000,
      created_at: now,
      updated_at: now
    },
    {
      user_id: 1,
      account_name: "Cash",
      total_balance: 500000,
      created_at: now,
      updated_at: now
    }, {
      user_id: 1,
      account_name: "Gopay",
      total_balance: 1000000,
      created_at: now,
      updated_at: now
    }], {})
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("accounts", null, {})
  }
};
