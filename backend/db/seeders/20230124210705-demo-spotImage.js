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
      // spot 1
      {
        spotId: 1,
        url: 'https://www.thoughtco.com/thmb/m03idLs8Mzqq-_73DelAzgLWRms=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-117950117-969baa3b88ca430d8e51d6132371fa8e.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://www.thoughtco.com/thmb/zqCIETuWJm6zM3FPqwNUxnZFwZk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/White-House-Blue-Room-59b5b233396e5a0010d46f95.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://www.thoughtco.com/thmb/J1WdIV2PSalfqYZs7rIGPnxqZNY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-SO000830-5bedf76346e0fb0051499e97.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://jfforg-new-prod.s3.amazonaws.com/media/images/ray-harrington-lee19FWuQEA-unsplash.width-800.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://www.thoughtco.com/thmb/TC0HRUVh91WYYLV8tdVWIsVI-qk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/White-House-State-Dining-Room-59b5b290845b34001016be49.jpg',
        preview: false
      },
      // spot 2
      {
        spotId: 2,
        url: 'https://image.cnbcfm.com/api/v1/image/107123099-1663872668113-gettyimages-1423714478-029a3554_40a02cc0-73c3-4a25-86a9-63415451fac6.jpeg?v=1663890319&w=740&h=416&ffmt=webp&vtcrop=y',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Mar-a-Lago%2C_Palm_Beach._FL%2C_US.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://s.abcnews.com/images/Politics/fbi-mar-a-lago-search-trump-affadavit-02-ap-llr-220824_1661370798455_hpMain_16x9_1600.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://assets.trump.com/website/business/001-210530-_DSC0927-2-Courtney_Reed.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://www.rollingstone.com/wp-content/uploads/2023/06/mar-a-lago-pool-flood.jpg',
        preview: false
      },
      // spot 3
      {
        spotId: 3,
        url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/c5/71/f9/view-of-hearst-castle.jpg?w=1200&h=-1&s=1',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://media.architecturaldigest.com/photos/5d1a5691b4a2e8000976aa83/16:9/w_2560%2Cc_limit/GettyImages-1050350298.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://lp-cms-production.s3.amazonaws.com/public/2021-05/shutterstock_422528113.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://visitsansimeonca.com/wp-content/uploads/2017/09/hearst-castle.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://cdn.britannica.com/26/183126-050-0FDD3510/Neptune-Pool-San-Simeon-Hearst-Castle-California.jpg',
        preview: false
      },
      // spot 4
      {
        spotId: 4,
        url: 'https://www.thetopvillas.com/blog/wp-content/uploads/2020/09/mammoth-lakes-blog.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/06104bc079fe26122fa91c538586c300-full.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://www.rusticbilliards.com/uploads/2/8/1/7/28178413/rustic-log-pool-tables-cabin-generation-billiards-colorado_13.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://www.buffaloriver.com/wp-content/uploads/2020/11/gallery-1.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://trademarkmammoth.com/wp-content/uploads/2018/08/354-Tamarack-MLS_215.jpg',
        preview: false
      },
      // spot 5
      {
        spotId: 5,
        url: 'https://static2.mansionglobal.com/production/media/article-images/86c02ae61db69eee516280aeed10163f/large_Claridge_02.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://cdn.mos.cms.futurecdn.net/zisziefsfzb4YXpdixfhFA.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://absolutely.london///wp-content/uploads/2017/06/Belvedere-.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://i2-prod.mirror.co.uk/incoming/article10285668.ece/ALTERNATES/s615b/PAY-BNPS_LondonFlatWithStunningTowerBridgeViews_04.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://tmhmedia.themodernhouse.com/uploads/2020/06/Denbigh-Street-9-900x600.jpg',
        preview: false
      },
      // spot 6
      {
        spotId: 6,
        url: 'https://cdn.trendir.com/wp-content/uploads/old/house-design/2015/11/12/malibu-beach-house-ocean-side.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://media-cdn.tripadvisor.com/media/vr-splice-j/06/48/4a/6f.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://media.architecturaldigest.com/photos/5756d72569bcf60b7b86472c/16:9/w_2560%2Cc_limit/0716-lautner-lede.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://malibuluxuryrealty.com/wp-content/uploads/2017/10/19236pch-0458.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://t4.ftcdn.net/jpg/03/89/70/73/360_F_389707358_V4FGJoEKevi0XDGfvGDOEndBTe5pyorJ.jpg',
        preview: false
      },
      // spot 7
      {
        spotId: 7,
        url: 'https://static.wixstatic.com/media/7fe0c7_19cbe1b57e5c4479bee937e6f19cc329~mv2.jpg/v1/fit/w_2500,h_1330,al_c/7fe0c7_19cbe1b57e5c4479bee937e6f19cc329~mv2.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Ch%C3%A2teau_de_Poudenas_-2.JPG',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://www.guide-du-lot-et-garonne.com/_bibli/annonces/3164/hd/chateau-de-poudenas-02.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://media-cdn.tripadvisor.com/media/vr-splice-j/0b/22/5c/2a.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://www.guide-du-lot-et-garonne.com/_bibli/annonces/3164/hd/chateau-de-poudenas-07.jpg',
        preview: false
      },
      // spot 8
      {
        spotId: 8,
        url: 'https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2004/10/11/0/TheFarmhousePg64.jpg.rend.hgtvcom.616.493.suffix/1400929997286.jpeg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://assets-news.housing.com/news/wp-content/uploads/2020/12/30105641/What-is-a-farmhouse-FB-1200x700-compressed.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://media.architecturaldigest.com/photos/58175202ef29aecc140f19fb/master/w_1600%2Cc_limit/farmhouse-3.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://media.architecturaldigest.com/photos/62754645bf59f2e59fa6913a/master/w_1600%2Cc_limit/210825_Schoenfelder_0662%2520copy.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://hips.hearstapps.com/hmg-prod/images/modern-farmhouse-style-hbx100121mclaurenexcell-004-1648667402.jpg',
        preview: false
      },
      // spot 9
      {
        spotId: 9,
        url: 'https://www.publicdomainpictures.net/pictures/90000/nahled/rundown-shack-3.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Shack_in_Pigeon_Forge%2C_TN_by_Zachary_Davies.jpg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://st.depositphotos.com/1046403/4437/i/600/depositphotos_44378793-stock-photo-old-barn-on-the-palouse.jpg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://www.publicdomainpictures.net/pictures/90000/nahled/rundown-shack-2.jpg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://images.squarespace-cdn.com/content/v1/53690148e4b0554419ec629a/1399392486628-497KHL1HTBU1HG74GE9U/rw_studio-old-shack_1.jpg',
        preview: false
      },
      // spot 10
      {
        spotId: 10,
        url: 'https://images.squarespace-cdn.com/content/v1/58487dc4b8a79b6d02499b60/1649519694184-3EPP1YI2Z42AD4FB3XW0/Mark+Walberg%E2%80%99s+Beverly+Hills+Mansion+Lists+for+%2487.5M+71+Beverly+Park+45.jpg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://static2.mansionglobal.com/production/media/article-images/251a1cab630fc5777405173232ab502a/large_1.Arden27.jpg',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2019/3/29/2/HUHH2019-History_The-Beverly-CA_003.jpg.rend.hgtvcom.616.411.suffix/1553888188658.jpeg',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://media.nestseekers.com/files/Pdou2BRtVe3Mxeq.jpg',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://murreybowling.com/wp-content/uploads/home-bowling-alley.jpg',
        preview: false
      },
      // spot 11
      {
        spotId: 11,
        url: 'https://cdngeneral.rentcafe.com/dmslivecafe/2/34489/NMS%201548%20exterior_1.jpg',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://douglasemmettapartments.com/wp-content/uploads/2020/09/The-Shores_main-gallery_1024x768_16.jpg',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://www.marmol-radziner.com/wp-content/uploads/2016/04/the-waverly-1-1920x974.jpg',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://photos.zillowstatic.com/fp/d000a0fae199a1e13399220b639450fe-cc_ft_960.jpg',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://images1.apartments.com/i2/v2eCZb49oaMkNMQ_xhPb29wJU-LDsobAASIp7hEqZ48/111/the-shores-santa-monica-ca-primary-photo.jpg',
        preview: false
      },
      // spot 12
      {
        spotId: 12,
        url: 'https://images.dwell.com/photos-6592836378171633664/6633063009106575360-large/whisper-rock-ranch-just-north-of-pioneertown-california.jpg',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://admin.shltr.is/wp-content/uploads/2021/05/whisper3.jpg',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://admin.shltr.is/wp-content/uploads/2021/05/whisperM.jpg',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://images.squarespace-cdn.com/content/v1/5cf832a5ea673b0001d5ed1b/1580982718446-OUNH4S1BVFZIA1X78W67/IMG_0056.JPG',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://cdn.shopify.com/s/files/1/0043/8471/8938/files/234ce420-1588-11ec-ba5c-ab0bdb0a6b9b-JoshuaTreeQ321SiteHero2_812x457_crop_center.jpg',
        preview: false
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }
    }, {});
  }
};
