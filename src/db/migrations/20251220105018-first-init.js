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
    await t.commit()
  },

  async down(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction()
    await queryInterface.dropTable('ms_user', { transaction: t })
    t.commit()
  }
};
