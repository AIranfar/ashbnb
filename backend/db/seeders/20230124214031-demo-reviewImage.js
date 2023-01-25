'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    await queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'https://d1b7flq4e9knh1.cloudfront.net/wp-content/blogs.dir/8/files/2016/06/WH-STILLS_24-978x550.jpg'
      },
      {
        reviewId: 2,
        url: 'https://i.guim.co.uk/img/media/6bbb82b90aa2d9bf9fcfa8c663d99755ec4b6993/0_319_4969_2981/master/4969.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=218231104b012d6eea46b2b25023a5ac'
      },
      {
        reviewId: 3,
        url: 'https://media.architecturaldigest.com/photos/5d1a5691b4a2e8000976aa83/16:9/w_2560%2Cc_limit/GettyImages-1050350298.jpg'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
