'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 2,
        userId: 1,
        review: 'Stunning property but FBI everywhere for some reason',
        stars: 4
      },
      {
        spotId: 3,
        userId: 2,
        review: 'Insane ocean views but very old',
        stars: 3
      },
      {
        spotId: 4,
        userId: 3,
        review: 'Had an amazing time with the family. Very close to the ski resort',
        stars: 5
      },
      {
        spotId: 5,
        userId: 4,
        review: 'In the heart of London close to all the shops and nightlife',
        stars: 5
      },
      {
        spotId: 6,
        userId: 5,
        review: 'Breathtaking views of the ocean. What a lovely beachhouse',
        stars: 5
      },
      {
        spotId: 7,
        userId: 6,
        review: 'Lovely scenery but not much to do. In the middle of nowhere',
        stars: 2
      },
      {
        spotId: 8,
        userId: 7,
        review: 'Infested with bugs. Left with hundreds of mosquito bites',
        stars: 1
      },
      {
        spotId: 9,
        userId: 8,
        review: 'No livable conditions. Not even worth the insanely cheap price',
        stars: 1
      },
      {
        spotId: 10,
        userId: 1,
        review: 'The most amazing home I have ever seen. Stunning',
        stars: 5
      },
      {
        spotId: 7,
        userId: 4,
        review: 'This was my sons wedding venue. Everyone had a great time',
        stars: 5
      },
      {
        spotId: 1,
        userId: 8,
        review: 'From the history and the ambiance, it was a magical experience',
        stars: 4
      },
      {
        spotId: 2,
        userId: 6,
        review: 'Came here for the golf course and it did not disappoint',
        stars: 5
      },
      {
        spotId: 3,
        userId: 8,
        review: 'Terrible service. Was treated very poorly',
        stars: 1
      },
      {
        spotId: 11,
        userId: 4,
        review: 'Could not get ahold of the owner and could not get in for hours.',
        stars: 1
      },
      {
        spotId: 11,
        userId: 6,
        review: 'Stuning ocean views and amazing restaurants',
        stars: 5
      },
      {
        spotId: 12,
        userId: 6,
        review: 'Most amazing experience ever. Great hikes and in the heart of nature',
        stars: 5
      },
      {
        spotId: 12,
        userId: 6,
        review: 'Highly recommend for large party getaways',
        stars: 5
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }
    }, {});
  }
};
