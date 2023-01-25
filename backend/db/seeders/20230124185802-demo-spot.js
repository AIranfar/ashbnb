'use strict';
const bcrypt = require("bcryptjs");

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '1600 Pennsylvania Ave',
        city: 'Washington D.C.',
        state: 'Washington D.C.',
        country: 'USA',
        lat: 38.897957,
        lng: -77.036560,
        name: 'The White House',
        description: 'Where the President lives',
        price: 2500
      },{
        ownerId: 2,
        address: '1100 S Ocean Blvd',
        city: 'Palm Beach',
        state: 'Florida',
        country: 'USA',
        lat: 26.677067,
        lng: -80.03698,
        name: 'Mar-a-Lago',
        description: 'Where Donald Trump lives',
        price: 4500
      },
      {
        ownerId: 3,
        address: '750 Hearst Castle Rd',
        city: 'San Simeon',
        state: 'California',
        country: 'USA',
        lat: 35.6852,
        lng: -121.1682,
        name: 'Hearst Castle',
        description: 'Beautiful Castle on the coast of California',
        price: 1800
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['The White House', 'Mar-a-Lago', 'Hearst Castle'] }
    }, {});
  }
};
