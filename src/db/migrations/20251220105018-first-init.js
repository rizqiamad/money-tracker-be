'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()
    await queryInterface.createTable('ms_user', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
      },
      no_handphone: {
        type: Sequelize.STRING,
      },
      is_verified: {
        type: Sequelize.SMALLINT,
        defaultValue: 0,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    }, { transaction: t })

    await queryInterface.createTable('user_otp', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ms_user_id: {
        type: Sequelize.UUID,
        references: { model: "ms_user", key: "id" },
      },
      otp: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      otp_type: {
        type: Sequelize.STRING,
      },
      expired_at: {
        type: Sequelize.DATE,
      },
      used_at: {
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.DATE,
      },
    }, { transaction: t })

    await queryInterface.createTable('ms_account', {
      ms_account_code: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      ms_account_name: {
        type: Sequelize.STRING,
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    }, { transaction: t })

    await queryInterface.createTable('user_account', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ms_user_id: {
        type: Sequelize.UUID,
        references: { model: "ms_user", key: "id" },
      },
      ms_account_code: {
        type: Sequelize.STRING,
        references: { model: "ms_account", key: "ms_account_code" },
      },
      amount: {
        type: Sequelize.BIGINT
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    }, { transaction: t })

    await queryInterface.createTable('record', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_account_id: {
        type: Sequelize.INTEGER,
        references: { model: "user_account", key: "id" },
      },
      date_action: {
        type: Sequelize.DATE
      },
      amount: {
        type: Sequelize.BIGINT
      },
      category: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      created_at: {
        type: Sequelize.DATE
      }
    }, { transaction: t })
    await t.commit()
  },

  async down(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()
    await queryInterface.dropTable('user_otp', { transaction: t })
    await queryInterface.dropTable('record', { transaction: t })
    await queryInterface.dropTable('user_account', { transaction: t })
    await queryInterface.dropTable('ms_user', { transaction: t })
    await queryInterface.dropTable('ms_account', { transaction: t })
    t.commit()
  }
};
