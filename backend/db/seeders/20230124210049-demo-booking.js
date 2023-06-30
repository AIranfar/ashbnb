'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 2,
        userId: 1,
        startDate: '2020-09-12',
        endDate: '2020-09-18'
      },
      {
        spotId: 3,
        userId: 2,
        startDate: '2021-01-03',
        endDate: '2021-01-05'
      },
      {
        spotId: 4,
        userId: 3,
        startDate: '2021-05-11',
        endDate: '2021-05-15'
      },
      {
        spotId: 5,
        userId: 4,
        startDate: '2023-09-12',
        endDate: '2023-09-15'
      },
      {
        spotId: 6,
        userId: 5,
        startDate: '2023-08-01',
        endDate: '2023-08-06'
      },
      {
        spotId: 7,
        userId: 6,
        startDate: '2023-12-23',
        endDate: '2023-12-28'
      },
      {
        spotId: 8,
        userId: 7,
        startDate: '2023-11-12',
        endDate: '2023-11-15'
      },
      {
        spotId: 9,
        userId: 8,
        startDate: '2023-10-29',
        endDate: '2023-11-05'
      },
      {
        spotId: 10,
        userId: 1,
        startDate: '2023-07-02',
        endDate: '2023-07-08'
      },
      {
        spotId: 1,
        userId: 2,
        startDate: '2023-08-20',
        endDate: '2023-08-29'
      },
      {
        spotId: 11,
        userId: 5,
        startDate: '2023-08-11',
        endDate: '2023-08-18'
      },
      {
        spotId: 12,
        userId: 8,
        startDate: '2023-09-01',
        endDate: '2023-09-05'
      },
      {
        spotId: 13,
        userId: 2,
        startDate: '2023-09-26',
        endDate: '2023-09-30'
      },
      {
        spotId: 13,
        userId: 1,
        startDate: '2023-12-26',
        endDate: '2023-12-31'
      },
      {
        spotId: 14,
        userId: 3,
        startDate: '2023-08-01',
        endDate: '2023-08-06'
      },
      {
        spotId: 14,
        userId: 4,
        startDate: '2023-11-25',
        endDate: '2023-11-30'
      },
      {
        spotId: 15,
        userId: 5,
        startDate: '2023-11-01',
        endDate: '2023-11-06'
      },
      {
        spotId: 15,
        userId: 7,
        startDate: '2023-07-10',
        endDate: '2023-07-17'
      },
      {
        spotId: 16,
        userId: 2,
        startDate: '2023-07-01',
        endDate: '2023-07-06'
      },
      {
        spotId: 16,
        userId: 4,
        startDate: '2023-07-06',
        endDate: '2023-07-13'
      },
      {
        spotId: 17,
        userId: 1,
        startDate: '2024-02-12',
        endDate: '2024-02-19'
      },
      {
        spotId: 17,
        userId: 8,
        startDate: '2023-09-15',
        endDate: '2023-09-21'
      },
      {
        spotId: 18,
        userId: 4,
        startDate: '2023-10-05',
        endDate: '2023-10-10'
      },
      {
        spotId: 18,
        userId: 6,
        startDate: '2023-09-18',
        endDate: '2023-09-24'
      },
      {
        spotId: 19,
        userId: 7,
        startDate: '2023-10-05',
        endDate: '2023-10-10'
      },
      {
        spotId: 19,
        userId: 8,
        startDate: '2023-01-01',
        endDate: '2023-01-18'
      },
      {
        spotId: 20,
        userId: 8,
        startDate: '2023-07-01',
        endDate: '2023-07-08'
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] }
    });
  }
};
