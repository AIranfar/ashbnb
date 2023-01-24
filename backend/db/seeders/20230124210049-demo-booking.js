'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        startDate: '2020-09-12',
        endDate: '2020-09-18'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2021-01-03',
        endDate: '2021-01-05'
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2021-05-11',
        endDate: '2021-05-15'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
