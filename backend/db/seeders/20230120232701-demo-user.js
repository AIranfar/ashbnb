'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [

      {
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Christian',
        lastName: 'Carreon',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Shayan',
        lastName: 'Iranfar',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Han',
        lastName: 'Nguyen',
        email: 'Han@aa.io',
        username: 'AllIDoIsNguyen',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Christian',
        lastName: 'Oviedo',
        email: 'Christian@aa.io',
        username: 'CallMeTort',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Alec',
        lastName: 'Keeler',
        email: 'Alec@aa.io',
        username: 'Helloprogrammers',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Ash',
        lastName: 'Iranfar',
        email: 'Ash@aa.io',
        username: 'AshIranfar',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Azita',
        lastName: 'Amighi',
        email: 'Azita@aa.io',
        username: 'AzitaAmighi',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'AllIDoIsNguyen', 'CallMeTort', 'Helloprogrammers', 'AshIranfar', 'AzitaAmighi',] }
    }, {});
  }
};
