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
        description: "Experience the ultimate luxury and prestige at the White House, where you can immerse yourself in the rich history, complete with exclusive access to presidential suites and breathtaking views of the capital's landmarks.",
        price: 2500.00
      },
      {
        ownerId: 2,
        address: '1100 S Ocean Blvd',
        city: 'Palm Beach',
        state: 'Florida',
        country: 'USA',
        lat: 26.677067,
        lng: -80.03698,
        name: 'Mar-a-Lago',
        description: 'Experience the epitome of luxury and grandeur. Immerse yourself in the extravagant ambiance of this iconic estate, boasting breathtaking ocean views, lavish amenities, and unparalleled service, providing an unforgettable stay in Palm Beach, Florida.',
        price: 4500.00
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
        description: "Indulge in the timeless elegance and majestic charm. Immerse yourself in the opulent world of this legendary estate, surrounded by breathtaking architecture, sprawling gardens, and awe-inspiring views.",
        price: 1800.00
      },
      {
        ownerId: 4,
        address: '1234 Mammoth Mountain Rd',
        city: 'Mammoth',
        state: 'California',
        country: 'USA',
        name: 'Mammoth Cabin',
        description: 'Experience the rustic charm of Mammoth with our cozy cabin nestled in the heart of nature. Perfect for outdoor enthusiasts, our cabin offers a peaceful retreat surrounded by breathtaking mountain views',
        price: 799.00
      },
      {
        ownerId: 5,
        address: '899 Big Ben St',
        city: 'London',
        state: 'England',
        country: 'United Kingdom',
        name: 'London Flat',
        description: "Come experience the vibrant energy of London, then retreat to the comfort of our modern and well-appointed space. With sleek design, panoramic city views, and proximity to iconic landmarks, you'll experience the best of both worlds.",
        price: 499.00
      },
      {
        ownerId: 6,
        address: '556 Ocean Blvd',
        city: 'Malibu',
        state: 'California',
        country: 'USA',
        name: 'Malibu BeachHouse',
        description: "Looking for a beachfront escape? Look no further than our stunning beach house for rent! This spacious and airy home offers breathtaking views of the ocean, with easy access to the sandy shores just steps away.",
        price: 999.00
      },
      {
        ownerId: 7,
        address: '2 Rue de Chateau',
        city: 'Poudenas',
        state: 'Poudenas',
        country: 'France',
        name: 'Chateau de Poudenas',
        description: "With its medieval architecture and lush gardens, this enchanting castle offers a regal retreat. Indulge in luxurious rooms, explore the grand halls, and bask in the breathtaking views of the surrounding countryside.",
        price: 1309.00
      },
      {
        ownerId: 8,
        address: '88945 Farm House Rd',
        city: 'Austin',
        state: 'Texas',
        country: 'USA',
        name: 'Farm House',
        description: "Nestled amidst rolling green fields, this rustic retreat offers a tranquil escape. Immerse yourself in the timeless beauty of nature, relax on the spacious porch, and savor farm-to-table meals from our organic garden.",
        price: 500.00
      },
      {
        ownerId: 5,
        address: '1234 Reseda Blvd',
        city: 'Reseda',
        state: 'California',
        country: 'USA',
        name: 'Reseda Shack',
        description: "This weathered gem nestled in nature's embrace invites you to disconnect from the modern world. With its creaky floors, vintage decor, and peeling paint, it exudes character and tells tales of days gone by.",
        price: 49.00
      },
      {
        ownerId: 6,
        address: '920 Benedict Canyon Rd',
        city: 'Beverly Hills',
        state: 'California',
        country: 'USA',
        name: 'Beverly Hills Mansion',
        description: "Embrace the luxurious lifestyle of the elite as you relish in spacious living areas, breathtaking vistas, and unparalleled amenities, providing an unforgettable experience in the heart of Los Angeles' most prestigious neighborhood.",
        price: 1999.00
      },
      {
        ownerId: 4,
        address: '4437 Santa Monica Blvd',
        city: 'Santa Monica',
        state: 'California',
        country: 'USA',
        name: 'Santa Monica Apartment',
        description: "Discover the coastal charm and vibrant lifestyle of Santa Monica with our apartment rentals. Experience the perfect blend of beachside relaxation and urban excitement as you enjoy modern amenities.",
        price: 600.00
      },
      {
        ownerId: 7,
        address: '51535 Jalmar Rd',
        city: 'Joshua Tree',
        state: 'California',
        country: 'USA',
        name: 'Whisper Rock Ranch',
        description: "Find your escape in our high-desert hidden gem, perched on the brink of untouched wilderness amidst enchantingly weathered boulders, ancient juniper, pinón and desert oak trees. Enjoy our 360° outdoor deck equipped with a pool, hottub, and propane grill.",
        price: 1500.00
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['The White House', 'Mar-a-Lago', 'Hearst Castle', 'Mammoth Cabin', 'London Flat', 'Malibu BeachHouse', 'Chateau de Poudenas', 'Farm House', 'Reseda Shack', 'Beverly Hills Mansion', 'Santa Monica Apartment', 'Whisper Rock Ranch'] }
    }, {});
  }
};
