"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // USERS
    await queryInterface.bulkInsert("users", [
      { username: "Andi Widjayanto", email: "andi@gmail.com", password: "$2a$12$G5UGzNuozGY95zfAkQjkbeoIrXQnjrn6/au/KDo72MZYx.72aLa5.", created_at: now, updated_at: now },
      { username: "Budi Kusuma", email: "budi.kusuma@gmail.com", password: "$2a$12$G5UGzNuozGY95zfAkQjkbeoIrXQnjrn6/au/KDo72MZYx.72aLa5.", created_at: now, updated_at: now },
      { username: "Caca Mariska", email: "caca.mariska@gmail.com", password: "$2a$12$G5UGzNuozGY95zfAkQjkbeoIrXQnjrn6/au/KDo72MZYx.72aLa5.", created_at: now, updated_at: now },
      { username: "Deni Santoso", email: "deni@gmail.com", password: "$2a$12$G5UGzNuozGY95zfAkQjkbeoIrXQnjrn6/au/KDo72MZYx.72aLa5.", created_at: now, updated_at: now },
      { username: "Eka Rahma", email: "eka.rahma@gmail.com", password: "$2a$12$G5UGzNuozGY95zfAkQjkbeoIrXQnjrn6/au/KDo72MZYx.72aLa5.", created_at: now, updated_at: now },
    ]);

    // ACCOUNTS
    await queryInterface.bulkInsert("accounts", [
      { account_name: "BCA", created_at: now, updated_at: now },
      { account_name: "Cash", created_at: now, updated_at: now },
      { account_name: "Gopay", created_at: now, updated_at: now },
    ]);

    // POOL ACCOUNTS USERS
    await queryInterface.bulkInsert("pool_accounts_users", [
      { user_id: 1, account_id: 1, initial_balance: 1600000, actual_balance: 900000, created_at: now, updated_at: now },
      { user_id: 1, account_id: 2, initial_balance: 500000, actual_balance: 565000, created_at: now, updated_at: now },
      { user_id: 2, account_id: 1, initial_balance: 1000000, actual_balance: 3000000, created_at: now, updated_at: now },
      { user_id: 3, account_id: 2, initial_balance: 650000, actual_balance: 550000, created_at: now, updated_at: now },
      { user_id: 3, account_id: 1, initial_balance: 1200000, actual_balance: 5669000, created_at: now, updated_at: now },
      { user_id: 3, account_id: 3, initial_balance: 20000, actual_balance: 50000, created_at: now, updated_at: now },
      { user_id: 4, account_id: 3, initial_balance: 21500, actual_balance: 21500, created_at: now, updated_at: now },
    ]);

    // RECORDS
    await queryInterface.bulkInsert("records", [
      { pool_accounts_users_id: 1, type: "income", category: "salary", amount: 3000000, description: "Gaji", created_at: now, updated_at: now },
      { pool_accounts_users_id: 2, type: "expenses", category: "meal", amount: 75000, description: "Makan pagi", created_at: now, updated_at: now },
      { pool_accounts_users_id: 2, type: "expenses", category: "meal", amount: 25000, description: "Makan siang", created_at: now, updated_at: now },
      { pool_accounts_users_id: 2, type: "expenses", category: "meal", amount: 35000, description: "Makan malam", created_at: now, updated_at: now },
      { pool_accounts_users_id: 1, type: "expenses", category: "lifestyle", amount: 3500000, description: "Hp baru", created_at: now, updated_at: now },
      { pool_accounts_users_id: 3, type: "income", category: "freelance", amount: 2000000, description: "Project", created_at: now, updated_at: now },
      { pool_accounts_users_id: 4, type: "expenses", category: "internet", amount: 100000, description: "Internet bulanan", created_at: now, updated_at: now },
      { pool_accounts_users_id: 5, type: "income", category: "salary", amount: 4500000, description: "Gaji", created_at: now, updated_at: now },
    ]);

    // TRANSFER LOGS (antar akun milik user yang sama)
    await queryInterface.bulkInsert("transfer_logs", [
      { pool_accounts_users_from_id: 1, amount_sent: 200000, pool_accounts_users_to_id: 2, amount_received: 200000, description: "Tarik tunai", created_at: now, updated_at: now },
      { pool_accounts_users_from_id: 5, amount_sent: 31000, pool_accounts_users_to_id: 6, amount_received: 30000, created_at: now, updated_at: now },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("transfer_logs", null, {});
    await queryInterface.bulkDelete("records", null, {});
    await queryInterface.bulkDelete("pool_accounts_users", null, {});
    await queryInterface.bulkDelete("accounts", null, {});
    await queryInterface.bulkDelete("users", null, {});
  },
};
