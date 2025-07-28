'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const now = new Date()
    await queryInterface.bulkInsert("users", [
      { username: "Andi Widjayanto", email: "andi@gmail.com", password: "test123", created_at: now, updated_at: now },
      { username: "Budi Kusuma", email: "budi.kusuma@gmail.com", password: "test123", created_at: now, updated_at: now },
      { username: "Caca Mariska", email: "itscaca@gmail.com", password: "test123", created_at: now, updated_at: now },
      { username: "Denis Adit", email: "dodit@gmail.com", password: "test123", created_at: now, updated_at: now },
    ])

    await queryInterface.bulkInsert("accounts", [
      { account_name: "BCA", created_at: now, updated_at: now },
      { account_name: "Cash", created_at: now, updated_at: now },
      { account_name: "BSI", created_at: now, updated_at: now },
      { account_name: "BNI", created_at: now, updated_at: now },
      { account_name: "Dana", created_at: now, updated_at: now },
      { account_name: "Gopay", created_at: now, updated_at: now },
    ])

    await queryInterface.bulkInsert("pool_accounts_users", [
      { user_id: 4, account_id: 1, total_balance: 20000000, created_at: now, updated_at: now },
      { user_id: 4, account_id: 2, total_balance: 500000, created_at: now, updated_at: now },
      { user_id: 4, account_id: 3, total_balance: 6300000, created_at: now, updated_at: now },
      { user_id: 5, account_id: 1, total_balance: 11000000, created_at: now, updated_at: now },
      { user_id: 6, account_id: 1, total_balance: 23000000, created_at: now, updated_at: now },
      { user_id: 6, account_id: 3, total_balance: 1000000, created_at: now, updated_at: now },
      { user_id: 6, account_id: 5, total_balance: 2000000, created_at: now, updated_at: now },
    ])

    await queryInterface.bulkInsert("records", [
      { pool_accounts_users_id: 1, type: "income", category: "salary", amount: 20000000, description: "gaji bulan pertama", created_at: now, updated_at: now },
      { pool_accounts_users_id: 4, type: "income", category: "salary", amount: 6000000, description: "gaji", created_at: now, updated_at: now },
      { pool_accounts_users_id: 5, type: "expenses", category: "lifestyle", amount: 500000, created_at: now, updated_at: now },
      { pool_accounts_users_id: 1, type: "expenses", category: "meal", amount: 20000, description: "sarapan", created_at: now, updated_at: now },
    ])

    await queryInterface.bulkInsert("transfer_logs", [
      { pool_accounts_users_from_id: 1, amount_sent: 202500, pool_accounts_users_to_id: 2, amount_received: 200000, description: "wd", created_at: now, updated_at: now },
      { pool_accounts_users_from_id: 3, amount_sent: 1002500, pool_accounts_users_to_id: 1, amount_received: 1000000, created_at: now, updated_at: now },
      { pool_accounts_users_from_id: 5, amount_sent: 2502500, pool_accounts_users_to_id: 6, amount_received: 2500000, created_at: now, updated_at: now },
      { pool_accounts_users_from_id: 5, amount_sent: 502500, pool_accounts_users_to_id: 7, amount_received: 500000, description: "wd", created_at: now, updated_at: now },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('transfer_logs', null, {})
    await queryInterface.bulkDelete('records', null, {})
    await queryInterface.bulkDelete('pool_accounts_users', null, {})
    await queryInterface.bulkDelete('accounts', null, {})
    await queryInterface.bulkDelete('users', null, {})
  }
};
