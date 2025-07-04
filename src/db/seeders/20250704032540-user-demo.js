'use strict';

const now = new Date()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users", [{
      username: "Mafia Shalawat",
      email: "mafiashalawat@gmail.com",
      password: "$2y$10$TsqiTh3bYeDGPgAOp.SABuih6knySSGBDug5C5abCZ6TJWj54vJYa",
      no_handphone: "+6281221024953",
      created_at: now,
    },
    {
      username: "Mafia Tanah",
      email: "mafiatanah@gmail.com",
      password: "$2y$10$TsqiTh3bYeDGPgAOp.SABuih6knySSGBDug5C5abCZ6TJWj54vJYa",
      no_handphone: "+6281325074953",
      created_at: now,
    }, {
      username: "Mafia Jamaah",
      email: "mafiajamaah@gmail.com",
      password: "$2y$10$TsqiTh3bYeDGPgAOp.SABuih6knySSGBDug5C5abCZ6TJWj54vJYa",
      no_handphone: "+6281059021953",
      created_at: now,
    }], {})
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {})
  }
};
