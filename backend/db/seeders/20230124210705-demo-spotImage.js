'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
      // spot 13
      {
        spotId: 13,
        url: 'https://www.miamiherald.com/latest-news/b870js/picture252310098/alternates/LANDSCAPE_1140/4.%20District%20225.jpg',
        preview: true
      },
      {
        spotId: 13,
        url: 'https://luxlifemiamiblog.com/wp-content/uploads/2019/01/Turnberry-OC-12-Amenities_AMEast01-02-1.jpg',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://cdn.floridadesign.com/wp-content/uploads/sites/137/2020/03/fb7-5.jpg',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://www.thepinnaclelist.com/wp-content/uploads/2019/07/03-Brickell-Flatiron-1001-S-Miami-Ave-Miami-Florida.jpg',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://media01.findrentals.com/rentals/14897/145727/miami-beach-condo-mon-104-balcony-view-sunset-pool-24h-gym-spa-free-wifi-1.jpg',
        preview: false
      },
      // spot 14
      {
        spotId: 14,
        url: 'https://media.architecturaldigest.com/photos/57644ef1e1e6f08b2aa59813/4:3/w_2299,h_1724,c_limit/50%20Gramercy%20Park%202.jpg',
        preview: true
      },
      {
        spotId: 14,
        url: 'https://media.architecturaldigest.com/photos/570522a05fc159282a6446e5/master/w_1600%2Cc_limit/the-bryant-david-chipperfields-first-high-rise-new-york-city-02.jpg',
        preview: false
      },
      {
        spotId: 14,
        url: 'https://thumbs.cityrealty.com/assets/smart/0x0/webp/6/61/61d4abdc2c940b6b62565506f50e30e909347340/one57-157-west-57th-street-00.jpg',
        preview: false
      },
      {
        spotId: 14,
        url: 'https://secretnyc.co/wp-content/uploads/2022/09/serhant4-1024x767.jpg',
        preview: false
      },
      {
        spotId: 14,
        url: 'https://e1.pxfuel.com/desktop-wallpaper/191/900/desktop-wallpaper-new-york-apartment-luxury-apartment.jpg',
        preview: false
      },
      // spot 15
      {
        spotId: 15,
        url: 'https://images.dwell.com/photos/6996557515874611200/6996563860283920384/large.jpg',
        preview: true
      },
      {
        spotId: 15,
        url: 'https://www.collater.al/wp-content/uploads/2020/06/invisible-house-collater.al-009-1024x683.jpg',
        preview: false
      },
      {
        spotId: 15,
        url: 'https://cdn.blessthisstuff.com/imagens/stuff/invisible-house-5.jpg',
        preview: false
      },
      {
        spotId: 15,
        url: 'https://cdn.archilovers.com/projects/6d9da57f-314e-4a04-a123-f156ad7774cd.jpeg',
        preview: false
      },
      {
        spotId: 15,
        url: 'https://viemagazine.com/wp-content/uploads/2021/02/vie-magazine-invisible-house-3-min.jpg',
        preview: false
      },
      // spot 16
      {
        spotId: 16,
        url: 'https://americansnowbird.com/img/uploads/29502/thumb/large/1M3A8621.jpg',
        preview: true
      },
      {
        spotId: 16,
        url: 'https://arizona-content.usedirect.com/storage/gallery/0004/0023/7AD55ADA0F6D459CB69AF74FC9E236C6/medium.jpg',
        preview: false
      },
      {
        spotId: 16,
        url: 'https://images.contentstack.io/v3/assets/blt00454ccee8f8fe6b/blt65ecbf6d3b732c95/5fd432ef50460c30dd540e98/US_LakeHavasuCity_US_Header.jpeg',
        preview: false
      },
      {
        spotId: 16,
        url: 'https://lavish-lake-house-getaway-w-pool-lake-havasu-city-az-us.booked.net/data/Photos/OriginalPhoto/9614/961473/961473346/Lavish-Lake-House-Retreat-With-Private-Pool-Spa-And-Bbq-Lake-Havasu-City-Exterior.JPEG',
        preview: false
      },
      {
        spotId: 16,
        url: 'https://upload.travelawaits.com/ta/uploads/2023/02/Cover-Lake-Havasu-State-Park-800x800.jpeg',
        preview: false
      },
      // spot 17
      {
        spotId: 17,
        url: 'https://images1.apartments.com/i2/_CJdx_po89Hb0z9L2ktdGiwzxBygtMIZEBkUczOPMaE/111/719-bourbon-st-unit-719-new-orleans-la-primary-photo.jpg',
        preview: true
      },
      {
        spotId: 17,
        url: 'https://images1.apartments.com/i2/-mqDeFwV31JhUbU7wxKGB1ZPJrwBfWNM3A_bpsFwlZM/111/812-bourbon-st-unit-apt-4-new-orleans-la-primary-photo.jpg',
        preview: false
      },
      {
        spotId: 17,
        url: 'https://i.pinimg.com/736x/b0/73/f6/b073f61a7430232518eada9aaab2baea--parisian-apartment-paris-apartments.jpg',
        preview: false
      },
      {
        spotId: 17,
        url: 'https://bourbonstreetbalconyrentals.com/wp-content/uploads/2022/09/BSBR-Home-Image.jpg',
        preview: false
      },
      {
        spotId: 17,
        url: 'https://bourbonvieux.com/wp-content/uploads/sites/14/2020/03/REVVHP_1962-1024x576.jpg',
        preview: false
      },
      // spot 18
      {
        spotId: 18,
        url: 'https://media.architecturaldigest.com/photos/57041af15fc159282a6443be/16:9/w_2580,c_limit/don-rela-gleason-mcalpine-napa-valley-for-sale-01.jpg',
        preview: true
      },
      {
        spotId: 18,
        url: 'https://4.bp.blogspot.com/-ofLQMZtNu6E/VsKMbxG__ZI/AAAAAAAAJS0/hFBQrUs7nzc/s1600/IMG_7077.JPG',
        preview: false
      },
      {
        spotId: 18,
        url: 'https://m.wsj.net/video/20191025/102819lotd_ca/102819lotd_ca_640x360.jpg',
        preview: false
      },
      {
        spotId: 18,
        url: 'https://daily.sevenfifty.com/app/uploads/2017/06/SFD_Wine_Region_Napa_CR_iStock_2520x1890.jpg',
        preview: false
      },
      {
        spotId: 18,
        url: 'https://www.tastingtable.com/img/gallery/25-absolute-best-wineries-in-napa-valley/l-intro-1649178566.jpg',
        preview: false
      },
      // spot 19
      {
        spotId: 19,
        url: 'https://www.hollywoodreporter.com/wp-content/uploads/2013/12/WINTERREALESTATESidebar_TAHOE.jpg',
        preview: true
      },
      {
        spotId: 19,
        url: 'https://onefinestay.imgix.net/cms-media/Aspen-header.jpg',
        preview: false
      },
      {
        spotId: 19,
        url: 'https://www.territorysupply.com/wp-content/uploads/2022/01/luxury-aspen-colorado-cabin-rental.jpg',
        preview: false
      },
      {
        spotId: 19,
        url: 'https://media.glampinghub.com/CACHE/images/accommodations/moving-mountains-mountain-high-chalet-log-cabin-1528712075659/1ae8b8f43b8801d1312f125e4ab44d52.jpg',
        preview: false
      },
      {
        spotId: 19,
        url: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Lift_1A_on_Aspen_Mountain.jpg',
        preview: false
      },
      // spot 20
      {
        spotId: 20,
        url: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Pra%C3%A7a_Cant%C3%A3o.jpg',
        preview: true
      },
      {
        spotId: 20,
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/1_rio_de_janeiro_slum_2010.JPG/650px-1_rio_de_janeiro_slum_2010.JPG',
        preview: false
      },
      {
        spotId: 20,
        url: 'https://cdn.vanderbilt.edu/vu-news/files/20210604141452/Favela.jpg',
        preview: false
      },
      {
        spotId: 20,
        url: 'https://img.lemde.fr/2023/06/16/167/0/4000/2666/1440/960/60/0/6e3d157_1686940346823-20230608-122615.jpg',
        preview: false
      },
      {
        spotId: 20,
        url: 'https://p1.pxfuel.com/preview/958/654/553/brazil-favela-slum-rio-de-janeiro-sunrise.jpg',
        preview: false
      },
      // spot 21
      {
        spotId: 21,
        url: 'https://media.cntraveler.com/photos/55e47965cdd1761348bdba87/16:9/w_1280,c_limit/amsterdam-canal-cr-gallery-stock.jpg',
        preview: true
      },
      {
        spotId: 21,
        url: 'https://archello.s3.eu-central-1.amazonaws.com/images/2014/04/10/2014AMS0004LR.1506073140.096.jpg',
        preview: false
      },
      {
        spotId: 21,
        url: 'https://hollywoodlife.com/wp-content/uploads/2016/10/justin-bieber-penthouse-ftr.jpg',
        preview: false
      },
      {
        spotId: 21,
        url: 'https://a.cdn-hotels.com/gdcs/production145/d676/6b38790d-7db5-436b-a8eb-73eef8dec89e.jpg',
        preview: false
      },
      {
        spotId: 21,
        url: 'https://a.cdn-hotels.com/gdcs/production26/d703/2d2c1043-304b-4b16-ba00-67d78d810f10.jpg',
        preview: false
      },
      // spot 22
      {
        spotId: 22,
        url: 'https://www.jonesaroundtheworld.com/wp-content/uploads/2019/12/Best-Airbnbs-in-Madrid.jpg',
        preview: true
      },
      {
        spotId: 22,
        url: 'https://media.cntraveler.com/photos/5e2208607a47880008257c58/master/w_1600%2Cc_limit/AIRBNB-9659461.jpg',
        preview: false
      },
      {
        spotId: 22,
        url: 'https://media.timeout.com/images/105930140/750/422/image.jpg',
        preview: false
      },
      {
        spotId: 22,
        url: 'https://images.contentstack.io/v3/assets/blt00454ccee8f8fe6b/blta97c98aa90f3d46b/60913338f6a831100b5df01d/US_Madrid_ES_Header.jpg',
        preview: false
      },
      {
        spotId: 22,
        url: 'https://www.jonesaroundtheworld.com/wp-content/uploads/2019/12/Best-Airbnbs-in-Madrid-2020.jpg',
        preview: false
      },
      // spot 23
      {
        spotId: 23,
        url: 'https://cdn1.matadornetwork.com/blogs/1/2023/05/airbnb-in-iceland-13-1.jpg',
        preview: true
      },
      {
        spotId: 23,
        url: 'https://i.pinimg.com/originals/55/1f/94/551f9411846a37e8e0b6ca19456a365d.jpg',
        preview: false
      },
      {
        spotId: 23,
        url: 'https://a0.muscache.com/im/pictures/25625163/d4833a1c_original.jpg',
        preview: false
      },
      {
        spotId: 23,
        url: 'https://compote.slate.com/images/e215b527-a335-4674-89ee-3145892c8737.jpg',
        preview: false
      },
      {
        spotId: 23,
        url: 'https://www.indystar.com/gcdn/presto/2018/12/15/USAT/2e7b9863-85ac-4faa-aad3-096fc1826c20-GettyImages-841647034.jpg',
        preview: false
      },
      // spot 24
      {
        spotId: 24,
        url: 'https://a0.muscache.com/im/pictures/22c14fea-4d19-4a9a-8582-be641941d9e8.jpg',
        preview: true
      },
      {
        spotId: 24,
        url: 'https://cdn.gobankingrates.com/wp-content/uploads/2022/09/Kahua-Kohola-Estate-Airbnb-1.jpg',
        preview: false
      },
      {
        spotId: 24,
        url: 'https://d.newsweek.com/en/full/1310267/best-hawaii-beaches.jpg',
        preview: false
      },
      {
        spotId: 24,
        url: 'https://assets.vogue.com/photos/60a55df57881505c9fecf8af/master/w_1600%2Cc_limit/dc60abc6-a945-4b02-9b23-cc00d1077cd6.jpg',
        preview: false
      },
      {
        spotId: 24,
        url: 'https://images.contentstack.io/v3/assets/blt00454ccee8f8fe6b/blt8d9a75aa58e8b523/6139d8b150d82f3b0a7aa2ce/US_Kailua-Kona_US_Header.jpg',
        preview: false
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] }
    }, {});
  }
};
