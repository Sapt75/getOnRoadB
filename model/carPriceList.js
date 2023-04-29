const mongoose = require('mongoose');

const pricedetails = new mongoose.Schema({
    // brand:{type: String},
    // model:{type: String,},
    // version:{type: String,},
    // car: {
    //       },
          Version_UID:{type: Number},
          city_name: {
            type: String
          }
        //   state:{type: String},
        //   city_idcity_nameex_showroom_price:{type: Number},
        //   cow_cess:{type: String},
        //   registeration_charges:{type: String},
        //   rto:{type: String},
        //   road_safety_tax_cess:{type: String},
        //   mcd:{type: String},
        //   insurance:{type: String},
        //   fastag:{type: String},
        //   hypothecation_charges:{type: String},
        //   tax_collected_at_source_tcs:{type: String},
        //   one_year_extended_warranty:{type: String},
        //   second_year_extended_warranty:{type: String},
        //   three_year_extended_warranty:{type: String},
        //   four_year_extended_warranty:{type: String},
        //   five_year_extended_warranty:{type: String},
        //   shield_of_trust:{type: String},
        //   extended_warranty:{type: String},
        //   paint_protection:{type: String},
        //   three_m_protection:{type: String},
        //   accessories_package:{type: String},
        //   genuine_accessories:{type: String},
        //   zero_dep_insurance:{type: String},
        //   engine_protect:{type: String},
        //   rti:{type: String},
        //   one_year_rsa:{type: String},
        //   two_year_rsa:{type: String},
        //   four_year_rsa:{type: String},
        //   rsa:{type: String},
        //   rto_corporate:{type: String},
        //   rto_bh_series:{type: String},
        //   rto_bh_s:{type: String},
}, {collection: "pricedetails"})

const PriceDetails = mongoose.model('mytestpricedetail', pricedetails);

module.exports = PriceDetails;