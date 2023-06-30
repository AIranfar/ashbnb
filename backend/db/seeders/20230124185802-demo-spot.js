'use strict';
const bcrypt = require("bcryptjs");

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
      },
      {
        ownerId: 8,
        address: '7546 Ocean View Blvd',
        city: 'Miami',
        state: 'Florida',
        country: 'USA',
        name: 'Miami Condo',
        description: "Experience luxury living in the heart of Miami. Enjoy breathtaking ocean views, modern amenities, and a vibrant city lifestyle. Immerse yourself in the vibrant culture, renowned dining, and exciting nightlife that Miami has to offer.",
        price: 800.00
      },
      {
        ownerId: 1,
        address: '56 Park Ave',
        city: 'New York',
        state: 'New York',
        country: 'USA',
        name: 'NY Highrise',
        description: "Elevate your lifestyle in a prestigious NY high-rise rental. Immerse yourself in the iconic skyline views and impeccable design. Experience the vibrant energy of the city with world-class dining and entertainment just moments away. .",
        price: 749.00
      },
      {
        ownerId: 2,
        address: '8198 Uphill Rd',
        city: 'Joshua Tree',
        state: 'California',
        country: 'USA',
        name: 'The Invisible House',
        description: "Step into the extraordinary with the Invisible House, a marvel of architectural ingenuity. Seamlessly blending into its surroundings, this modern masterpiece offers a captivating fusion of nature and design.",
        price: 1200.00
      },
      {
        ownerId: 3,
        address: '4478 Lake Havasu Rd',
        city: 'Lake Havasu',
        state: 'Arizona',
        country: 'USA',
        name: 'The Lake House',
        description: "Nestled on the shores of this stunning desert oasis, indulge in serene lake views, endless water activities, and the ultimate relaxation. Experience the perfect blend of outdoor adventure with a private pool, and easy access to boating, and fishing.",
        price: 600.00
      },
      {
        ownerId: 5,
        address: '123 Bourbon St',
        city: 'New Orleans',
        state: 'Louisiana',
        country: 'USA',
        name: 'Bourbon Street Apartment',
        description: "Embrace the vibrant energy of New Orleans with our Bourbon Street apartment. Located in the heart of the iconic French Quarter, this stylish urban retreat offers the perfect blend of historic charm and modern convenience.",
        price: 450.00
      },
      {
        ownerId: 7,
        address: '4528 Linda Vista Ave',
        city: 'Napa',
        state: 'California',
        country: 'USA',
        name: 'Napa Valley Charmer',
        description: "Indulge in the epitome of wine country living. Nestled amidst rolling vineyards, this elegant retreat offers a tranquil escape from the ordinary. Experience the finest in wine tasting, culinary delights, and outdoor adventures.",
        price: 700.00
      },
      {
        ownerId: 4,
        address: '1233 Alta Vista Dr',
        city: 'Aspen',
        state: 'Colorado',
        country: 'USA',
        name: 'Aspen Ski Cabin',
        description: "Nestled amidst snow-covered peaks and pristine alpine beauty, this cozy retreat offers the perfect blend of rustic charm and modern luxury. Experience exhilarating ski adventures, breathtaking nature trails, and cozy evenings by the fireplace.",
        price: 1799.00
      },
      {
        ownerId: 2,
        address: '223 Favela Rd',
        city: 'Rio de Janeiro',
        state: 'Rio de Janeiro',
        country: 'Brazil',
        name: 'Brazilian Favela',
        description: "Our accommodations offer an authentic glimpse into the daily life of the community, showcasing resilience, creativity, and warmth. Discover the rich tapestry of music, art, and community spirit that thrives within these vibrant neighborhoods.",
        price: 150.00
      },
      {
        ownerId: 1,
        address: '1514 Canal Rd',
        city: 'Amsterdam',
        state: 'North Holland',
        country: 'Netherlands',
        name: 'Amsterdam Canal Apartment',
        description: "Embrace the charm of Amsterdam. Located in the picturesque canal belt, this enchanting retreat offers a perfect blend of historical elegance and modern comfort. Stroll along the cobblestone streets, and immerse yourself in the city's vibrant culture.",
        price: 500.00
      },
      {
        ownerId: 3,
        address: '324 Running Bull St',
        city: 'Madrid',
        state: 'Madrid',
        country: 'Spain',
        name: 'Madrid Rental',
        description: "Discover the vibrant heart of Spain's capital. This stylish haven invites you to immerse yourself in the rich history, art, and gastronomy. Explore iconic landmarks, indulge in delectable cuisine, and experience the energetic nightlife.",
        price: 400.00
      },
      {
        ownerId: 6,
        address: '6589 Reykjavik Ave',
        city: 'Reykjavik',
        state: 'Reykjavik',
        country: 'Iceland',
        name: 'Reykjavik Spot',
        description: "This cozy retreat invites you to experience the raw beauty of nature. Discover majestic waterfalls, geothermal wonders, and awe-inspiring glaciers. Immerse yourself in the tranquility of remote villages and witness the mesmerizing Northern Lights.",
        price: 900.00
      },
      {
        ownerId: 3,
        address: '3254 Big Island Rd',
        city: 'Maui',
        state: 'Hawaii',
        country: 'USA',
        name: 'Hawaii Beachhouse',
        description: "Escape to paradise with our Hawaii beach house. This luxurious retreat offers a tranquil oasis for relaxation and rejuvenation. Wake up to sound of waves, soak up the sun on your private lanai, and indulge in the turquoise waters just steps away.",
        price: 1100.00
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['The White House', 'Mar-a-Lago', 'Hearst Castle', 'Mammoth Cabin', 'London Flat', 'Malibu BeachHouse', 'Chateau de Poudenas', 'Farm House', 'Reseda Shack', 'Beverly Hills Mansion', 'Santa Monica Apartment', 'Whisper Rock Ranch', 'Miami Condo', 'NY Highrise', 'The Invisible House', 'The Lake House', 'Bourbon Street Apartment', 'Napa Valley Charmer', 'Aspen Ski Cabin', 'Brazilian Favela', 'Amsterdam Canal Apartment', 'Madrid Rental', 'Reykjavik Spot', 'Hawaii Beachhouse'] }
    }, {});
  }
};
