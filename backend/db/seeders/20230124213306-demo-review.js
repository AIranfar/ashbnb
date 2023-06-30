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
        userId: 3,
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
        userId: 3,
        review: 'Most amazing experience ever. Great hikes and in the heart of nature',
        stars: 5
      },
      {
        spotId: 12,
        userId: 5,
        review: 'Highly recommend for large party getaways',
        stars: 5
      },
      {
        spotId: 13,
        userId: 1,
        review: 'Amazing stay. Right in the heart of Miami',
        stars: 5
      },
      {
        spotId: 13,
        userId: 5,
        review: 'Beautiful views and lovely home. Very loud. Lots of noise pollution',
        stars: 3
      },
      {
        spotId: 14,
        userId: 6,
        review: 'Beautiful views of central park',
        stars: 5
      },
      {
        spotId: 14,
        userId: 7,
        review: 'Horrible stay. not clean.',
        stars: 1
      },
      {
        spotId: 15,
        userId: 1,
        review: 'Amazing hikes and right in the heart of nature',
        stars: 5
      },
      {
        spotId: 15,
        userId: 6,
        review: 'Mindnumbingly boring. Cool concept though',
        stars: 2
      },
      {
        spotId: 16,
        userId: 2,
        review: 'Always such a wonderful time at the lake with the family. Highly recommend',
        stars: 5
      },
      {
        spotId: 16,
        userId: 4,
        review: 'Mindnumbingly boring. Cool concept though',
        stars: 2
      },
      {
        spotId: 17,
        userId: 7,
        review: 'Perfect spot for Mardi Gras. In the heart of Bourbon street',
        stars: 5
      },
      {
        spotId: 17,
        userId: 4,
        review: 'Dirty. Loud. Horrible smell',
        stars: 1
      },
      {
        spotId: 18,
        userId: 1,
        review: 'Great wine tasting.',
        stars: 5
      },
      {
        spotId: 18,
        userId: 2,
        review: 'Amazing getaway spot. perfect for wine tasting and nightlife',
        stars: 5
      },
      {
        spotId: 19,
        userId: 3,
        review: 'Walking distance from the slopes. Beautiful views and decor',
        stars: 5
      },
      {
        spotId: 19,
        userId: 5,
        review: 'A bit too expensive but a very nice place nonetheless',
        stars: 3
      },
      {
        spotId: 20,
        userId: 7,
        review: 'Rich History and lovely people. Such a cool experience',
        stars: 5
      },
      {
        spotId: 20,
        userId: 8,
        review: 'A bit too expensive but a very nice place nonetheless',
        stars: 5
      },
      {
        spotId: 21,
        userId: 2,
        review: 'In the heart of Amsterdam. Great shopping and nightlife',
        stars: 5
      },
      {
        spotId: 21,
        userId: 3,
        review: 'Great location but very loud',
        stars: 4
      },
      {
        spotId: 22,
        userId: 5,
        review: 'Lovely Stay',
        stars: 5
      },
      {
        spotId: 22,
        userId: 6,
        review: 'What a horrible stay. Absoluetly bad time',
        stars: 1
      },
      {
        spotId: 23,
        userId: 2,
        review: 'Amazing once in a lifetime experience',
        stars: 5
      },
      {
        spotId: 23,
        userId: 7,
        review: 'Highly Recommend. Northern lights were breathtaking ',
        stars: 5
      },
      {
        spotId: 24,
        userId: 8,
        review: 'Too much rain. was forced to stay inside due to storms',
        stars: 2
      },
      {
        spotId: 24,
        userId: 1,
        review: 'Beautiful views but too many bugs',
        stars: 4
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] }
    }, {});
  }
};
