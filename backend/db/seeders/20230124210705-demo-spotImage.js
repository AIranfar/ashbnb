'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://www.thoughtco.com/thmb/m03idLs8Mzqq-_73DelAzgLWRms=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-117950117-969baa3b88ca430d8e51d6132371fa8e.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://image.cnbcfm.com/api/v1/image/107123099-1663872668113-gettyimages-1423714478-029a3554_40a02cc0-73c3-4a25-86a9-63415451fac6.jpeg?v=1663890319&w=740&h=416&ffmt=webp&vtcrop=y',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/c5/71/f9/view-of-hearst-castle.jpg?w=1200&h=-1&s=1',
        preview: true
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
