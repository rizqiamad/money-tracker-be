"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("users", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      username: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false },
      password: { type: Sequelize.STRING, allowNull: false },
      no_handphone: { type: Sequelize.STRING },
      is_verified: { type: Sequelize.SMALLINT, defaultValue: 0 },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
      deleted_at: { type: Sequelize.DATE, defaultValue: null },
    });

    await queryInterface.createTable("accounts", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      account_name: { type: Sequelize.STRING, allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
      deleted_at: { type: Sequelize.DATE, defaultValue: null },
    });

    await queryInterface.createTable("pool_accounts_users", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: Sequelize.INTEGER, allowNull: false, references: { key: "id", model: "users" } },
      account_id: { type: Sequelize.INTEGER, allowNull: false, references: { key: "id", model: "accounts" } },
      initial_balance: { type: Sequelize.INTEGER, defaultValue: 0 },
      actual_balance: { type: Sequelize.INTEGER, defaultValue: 0 },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
      deleted_at: { type: Sequelize.DATE, defaultValue: null },
    });

    await queryInterface.createTable("records", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      pool_accounts_users_id: { type: Sequelize.INTEGER, allowNull: false, references: { key: "id", model: "pool_accounts_users" } },
      type: { type: Sequelize.ENUM("income", "expenses"), allowNull: false },
      category: { type: Sequelize.ENUM("residence", "meal", "lifestyle", "equipment", "transportation", "charity", "health", "salary", "investment", "freelance", "internet", "etc"), allowNull: false },
      amount: { type: Sequelize.INTEGER, defaultValue: 0 },
      description: { type: Sequelize.TEXT },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
      deleted_at: { type: Sequelize.DATE, defaultValue: null },
    });

    await queryInterface.createTable("transfer_logs", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      pool_accounts_users_from_id: { type: Sequelize.INTEGER, allowNull: false, references: { key: "id", model: "pool_accounts_users" } },
      amount_sent: { type: Sequelize.INTEGER, defaultValue: 0 },
      pool_accounts_users_to_id: { type: Sequelize.INTEGER, allowNull: false, references: { key: "id", model: "pool_accounts_users" } },
      amount_received: { type: Sequelize.INTEGER, defaultValue: 0 },
      description: { type: Sequelize.TEXT },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
      deleted_at: { type: Sequelize.DATE, defaultValue: null },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("transfer_logs");
    await queryInterface.dropTable("records");
    await queryInterface.dropTable("pool_accounts_users");
    await queryInterface.dropTable("accounts");
    await queryInterface.dropTable("users");
  },
};
