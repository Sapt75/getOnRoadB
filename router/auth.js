const express = require('express');
const router = express.Router();
const path = require("path")


require('../db/conn');
const User = require("../model/userSchema");

const Admin = require("../model/userAddForm");

const City = require("../model/cityAddForm");

const Fueltype = require("../model/fueltypeAddForm");

const Transmissiontype = require("../model/transmissiontypeAddForm");

const CarData = require("../model/carData");

const NewCarData = require("../model/newcarData");

const NewCars = require("../model/newCars");

const PriceDetails = require("../model/carPriceList");

const Dealer_Details = require("../model/dealer_details");

const City_Details = require("../model/city_names")

const Model_Prices = require('../model/model_price_range')

const Version_Prices = require('../model/version_price_range')

const Price_Query = require("../model/userPriceQuery");
const PriceQuery = require('../model/userPriceQuery');



router.get('/*', (req, res) => {
    // let data = __dirname.split("\\")
    // let dir = ""

    // for (let i = 0; i < data.length; i++) {
    //     if (i == data.length-2) {
    //         break
    //     }else{
    //         dir = dir + data[i] + "\\"
    //     }
    // }
    // console.log(dir)
    res.send("HEllo")
    // res.send(__filename)
    // res.sendFile('index.html', { root: dir + 'frontend_New11-04-23\\build' });
});

// router.get('/form', (req, res) =>{
//     res.send(`Lead Form`)
// });
router.get('/test-page', (req, res) => {
    console.log(`Test Rule`);
    res.send(`Test Page`);
});

//  Using Promises
// router.post('/form', (req, res) => {
//     const {name, phone, email, pincode} = req.body;
//     console.log(name);
//     console.log(phone);
//     console.log(email);
//     console.log(pincode);

//     if(!name|| !phone|| !email|| !pincode){
//         return res.status(422).json({error: "Plz fill the field properly"});
//     }

//     User.findOne({email:email})
//     .then((userExist)=>{
//         if(userExist){
//         return res.status(422).json({error: "Email already Exist"});
//         }

//         const user = new User({name, phone, email, pincode});
//         user.save().then(() => {
//             res.status(201).json({message: "User data added Successfuly"})
//         }).catch((err) => res.status(500).json({error:"Failed to add data to Database"}))
//     }).catch(err => {console.log(err);})
//     // console.log(req.body);
//     // console.log(req.body.name);
//     // console.log(req.body.email);
//     // res.json({message:req.body})
//     // res.send("My Form Page");
// });


// ||----------------------{Getonroadprice Lead form requests started}-------------------------||

//  Lead form post request for frontend
// add form data to database
router.post('/form', async (req, res) => {
    const { name, phone, email, pincode } = req.body;
    console.log(name);
    console.log(phone);
    console.log(email);
    console.log(pincode);

    if (!name || !phone || !email || !pincode) {
        return res.status(422).json({ error: "Plz fill the field properly" });
    }

    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "Email already Exist" });
        }

        const user = new User({ name, phone, email, pincode });

        // const userResponse = 
        await user.save();

        // if(userResponse){
        res.status(201).json({ message: "User data added Successfuly" })
        // }else{
        // res.status(500).json({error:"Failed to add data to Database"})
        // }


    }
    catch (err) {
        console.log(err);
    }


});
// -------to get data from getonroadprice to the adming dashboard inquiry page---------

// Get leadform data
router.get('/leadformdata', async (req, res) => {
    try {
        const leadformdata = await User.find();
        res.status(201).json(leadformdata);
        console.log(leadformdata);
    } catch (error) {
        res.status(422).json(error);
    }
});


// Get leadform full details
router.get("/getleadformdata/:id", async (req, res) => {
    try {
        console.log(req.params)
        const { id } = req.params;

        const leadformdataindividual = await User.findById({ _id: id });
        // console.log(citynameindividual);
        res.status(201).json(leadformdataindividual);

    } catch (error) {
        res.status(422).json(error);

    }
})

// ||----------------------{Getonroadprice Lead form requests closed}-------------------------||

//Admin route
router.post('/adduser', async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name);
    console.log(email);
    console.log(password);

    if (!name || !email || !password) {
        return res.status(422).json({ error: "Plz fill the field properly" });
    }
    try {
        const adminExist = await Admin.findOne({ email: email });

        if (adminExist) {
            return res.status(422).json({ error: "Admin already Exist" });
        }

        const admin = new Admin({ name, email, password });

        //

        await admin.save();

        res.status(201).json({ message: "Admin added Successfuly" })

    }
    catch (err) {
        console.log(err);
    }
})



// ||----------------------{City requests started}-------------------------||


//add City
router.post('/cityform', async (req, res) => {
    const { city } = req.body;
    console.log(city);

    if (!city) {
        return res.status(422).json({ error: "Plz fill the field properly" });
    }

    try {
        const userExist = await City.findOne({ city: city });

        if (userExist) {
            return res.status(422).json({ error: "City already Exist" });
        }
        const cityname = new City({ city });
        await cityname.save();
        res.status(201).json({ message: "New City added Successfuly" })
    }
    catch (err) {
        console.log(err);
    }


});


// Get City data
router.get('/citynames', async (req, res) => {
    try {
        const cityname = await City.find();
        res.status(201).json(cityname);
        console.log(cityname);
    } catch (error) {
        res.status(422).json(error);
    }
});


// Get city full details
router.get("/getcityname/:id", async (req, res) => {
    try {
        console.log(req.params)
        const { id } = req.params;

        const citynameindividual = await City.findById({ _id: id });
        // console.log(citynameindividual);
        res.status(201).json(citynameindividual);

    } catch (error) {
        res.status(422).json(error);

    }
})


// Update city data
router.patch("/updatecityname/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedcity = await City.findByIdAndUpdate(id, req.body, {
            new: true
        });
        console.log(updatedcity);
        res.status(201).json(updatedcity);
    } catch (error) {
        res.status(422).json(error);
    }
})

// delete city
router.delete("/deletecity/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletecity = await City.findByIdAndDelete({ _id: id })
        console.log(deletecity);
        res.status(201).json(deletecity);
    } catch (error) {
        res.status(422).json(error);
    }
})

// xx----------------------{City requests closed}-------------------------xx



// ||----------------------{FuelType requests started}-------------------------||

//add Fuel Type
router.post('/addfuelform', async (req, res) => {
    const { fueltype } = req.body;
    console.log(fueltype);

    if (!fueltype) {
        return res.status(422).json({ error: "Plz fill the field properly" });
    }

    try {
        const fueltypeExist = await Fueltype.findOne({ fueltype: fueltype });

        if (fueltypeExist) {
            return res.status(422).json({ error: "Fuel Type already Exist" });
        }
        const fueltypename = new Fueltype({ fueltype });
        await fueltypename.save();
        res.status(201).json({ message: "New Fuel Type added Successfuly" })
    }
    catch (err) {
        console.log(err);
    }


});


// Get FuelType data
router.get('/fueltypenames', async (req, res) => {
    try {
        const fueltypename = await Fueltype.find();
        res.status(201).json(fueltypename);
        console.log(fueltypename);
    } catch (error) {
        res.status(422).json(error);
    }
});

// Get FuelType full details
router.get("/getfueltypename/:id", async (req, res) => {
    try {
        console.log(req.params)
        const { id } = req.params;

        const fueltypenameindividual = await Fueltype.findById({ _id: id });
        // console.log(citynameindividual);
        res.status(201).json(fueltypenameindividual);

    } catch (error) {
        res.status(422).json(error);

    }
})

// Update fueltype data
router.patch("/updatefueltypename/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedfueltype = await Fueltype.findByIdAndUpdate(id, req.body, {
            new: true
        });
        console.log(updatedfueltype);
        res.status(201).json(updatedfueltype);
    } catch (error) {
        res.status(422).json(error);
    }
})

// delete fueltype
router.delete("/deletefueltype/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletefueltype = await Fueltype.findByIdAndDelete({ _id: id })
        console.log(deletefueltype);
        res.status(201).json(deletefueltype);
    } catch (error) {
        res.status(422).json(error);
    }
})


// xx----------------------{Fuel Type requests closed}-------------------------xx

// ||----------------------{Transmission Type requests started}-------------------------||


//add transmission type (1)
router.post('/addtransmissiontypeform', async (req, res) => {
    const { transmissiontype } = req.body;
    console.log(transmissiontype);

    if (!transmissiontype) {
        return res.status(422).json({ error: "Plz fill the field properly" });
    }

    try {
        const transmissiontypeExist = await Transmissiontype.findOne({ transmissiontype: transmissiontype });

        if (transmissiontypeExist) {
            return res.status(422).json({ error: "transmissiontype already Exist" });
        }
        const transmissiontypename = new Transmissiontype({ transmissiontype });
        await transmissiontypename.save();
        res.status(201).json({ message: "New transmissiontype added Successfuly" })
    }
    catch (err) {
        console.log(err);
    }


});

// Get transmissiontype data (2)
router.get('/transmissiontypenames', async (req, res) => {
    try {
        const transmissiontypename = await Transmissiontype.find();
        res.status(201).json(transmissiontypename);
        console.log(transmissiontypename);
    } catch (error) {
        res.status(422).json(error);
    }
});

// Get transmissiontype full details (3)
router.get("/gettransmissiontypename/:id", async (req, res) => {
    try {
        console.log(req.params)
        const { id } = req.params;

        const transmissiontypenameindividual = await Transmissiontype.findById({ _id: id });
        // console.log(citynameindividual);
        res.status(201).json(transmissiontypenameindividual);

    } catch (error) {
        res.status(422).json(error);

    }
})

// Update transmissiontype data (4)
router.patch("/updatetransmissiontypename/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedtransmissiontype = await Transmissiontype.findByIdAndUpdate(id, req.body, {
            new: true
        });
        console.log(updatedtransmissiontype);
        res.status(201).json(updatedtransmissiontype);
    } catch (error) {
        res.status(422).json(error);
    }
})


// delete transmissiontype (5)
router.delete("/deletetransmissiontype/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletetransmissiontype = await Transmissiontype.findByIdAndDelete({ _id: id })
        console.log(deletetransmissiontype);
        res.status(201).json(deletetransmissiontype);
    } catch (error) {
        res.status(422).json(error);
    }
})

// xx----------------------{Transmission Type requests closed}-------------------------xx




// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx FOR FRONTEND xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// ||----------------------{Car Data requests Started}-------------------------||



router.post('/cars', async (req, res) => {
    const { brand, model, version, car } = req.body;
    console.log(brand);
    console.log(model);
    console.log(version);
    console.log(car);
    if (!brand || !model || !version) {
        return res.status(422).json({ error: "Plz fill the field properly" });
    }
    try {
        const carExist = await CarData.findOne({ version: version });
        if (carExist) {
            return res.status(422).json({ error: "Car already Exist" });
        }
        const cardata = new CarData({ brand, model, version, car });
        await cardata.save();
        res.status(201).json({ message: "Car data added Successfuly" })
    }
    catch (err) {
        console.log(err);
    }
});



router.get('/carsdata', async (req, res) => {
    try {
        const cardata = await CarData.find();
        res.status(201).json(cardata);
        console.log(cardata);
    } catch (error) {
        res.status(422).json(error);
    }
});

router.get("/getcardata/:id", async (req, res) => {
    try {
        console.log(req.params)
        const { id } = req.params;

        const cardataindividual = await CarData.findById({ _id: id });
        // console.log(citynameindividual);
        res.status(201).json(cardataindividual);

    } catch (error) {
        res.status(422).json(error);

    }
})


// Get Car data (1)




// ||----------------------{Car new test Data requests Started}-------------------------||



router.post('/newcars', async (req, res) => {
    const { brand, model, version, car } = req.body;
    console.log(brand);
    console.log(model);
    console.log(version);
    console.log(car);
    if (!brand || !model || !version) {
        return res.status(422).json({ error: "Plz fill the field properly" });
    }
    try {
        const carExist = await NewCarData.findOne({ version: version });
        if (carExist) {
            return res.status(422).json({ error: "Car already Exist" });
        }
        const cardata = new NewCarData({ brand, model, version, car });
        await cardata.save();
        res.status(201).json({ message: "Car data added Successfuly" })
    }
    catch (err) {
        console.log(err);
    }
});



router.get('/newcarsdata', async (req, res) => {
    try {
        const cardata = await NewCarData.find();
        res.status(201).json(cardata);
        // console.log(cardata);
    } catch (error) {
        res.status(422).json(error);
    }
});

router.get("/getnewcardata/:id", async (req, res) => {
    try {
        console.log(req.params)
        const { id } = req.params;

        const cardataindividual = await NewCarData.findById({ _id: id });
        // const cardataindividual = await NewCarData.find({brand:id});
        // console.log(citynameindividual);
        res.status(201).json(cardataindividual);

    } catch (error) {
        res.status(422).json(error);

    }
});

// for new car data 10/02/2023
router.get("/getnewonecardata/:model/:id", async (req, res) => {
    try {

        const { id, model } = req.params;

        const cardataindividual = await CarData.find({ version_name: id, model_id: model });
        // const cardataindividual = await NewCarData.find({brand:id});
        // console.log(citynameindividual);
        console.log(cardataindividual.length, id)
        res.status(201).json(cardataindividual);

    } catch (error) {
        res.status(422).json(error);

    }
});

// NewCars

router.get("/getonecardata/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const cardataindividual = await CarData.findById({ _id: id });
        // const cardataindividual = await NewCarData.find({brand:id});
        // console.log(citynameindividual);
        res.status(201).json(cardataindividual);

    } catch (error) {
        res.status(422).json(error);

    }
})

router.get("/getbrandcars", async (req, res) => {
    try {
        const branddata = await NewCarData.find(req.query);
        const NUM_OF_DATA = (branddata.length);
        console.log(NUM_OF_DATA);
        res.status(201).json(NUM_OF_DATA)
    } catch (error) {
        res.status(422).json(error);
    }
})

// new car data 10/02/2023
router.get("/getonebrandcars", async (req, res) => {
    try {
        const branddata = await CarData.find(req.query);
        const NUM_OF_DATA = (branddata.length);
        console.log(NUM_OF_DATA);
        res.status(201).json(NUM_OF_DATA)
    } catch (error) {
        res.status(422).json(error);
    }
})

// new car data 10/02/2023
router.get("/getonebrandcarsnew", async (req, res) => {
    try {
        // const MAX_CAR_PER_PAGE = 10;
        // const page = parseInt(req.query.page) || 0;
        // const branddata = await NewCarData.find(req.query).limit(MAX_CAR_PER_PAGE).skip(MAX_CAR_PER_PAGE * page);
        console.log(req.query)
        const branddata = await CarData.find(req.query).select('fuel_type model_name transmission_type uid model_id -_id');
        // const ALL_CARS = await NewCarData.find(req.query);
        // const NO_OF_CARS = (ALL_CARS.length);
        // const NO_OF_PAGES = Math.ceil(NO_OF_CARS / MAX_CAR_PER_PAGE);
        // console.log(NO_OF_CARS);
        // console.log(NO_OF_PAGES);
        let newBrand = branddata.filter((value, index, self) => {
            return index === self.findIndex((t) => {
                return t.model_name == value.model_name
            })
        })

        res.status(201).json(newBrand);


    } catch (error) {
        res.status(422).json(error);

    }
})


router.get("/getonebrandcars", async (req, res) => {
    try {
        // const MAX_CAR_PER_PAGE = 10;
        // const page = parseInt(req.query.page) || 0;
        // const branddata = await NewCarData.find(req.query).limit(MAX_CAR_PER_PAGE).skip(MAX_CAR_PER_PAGE * page);
        const branddata = await NewCarData.find(req.query);
        // const ALL_CARS = await NewCarData.find(req.query);
        // const NO_OF_CARS = (ALL_CARS.length);
        // const NO_OF_PAGES = Math.ceil(NO_OF_CARS / MAX_CAR_PER_PAGE);
        console.log(req.query);
        // console.log(NO_OF_CARS);
        // console.log(NO_OF_PAGES);
        res.status(201).json(branddata);


    } catch (error) {
        res.status(422).json(error);

    }
})

// for model page - -   -   -   -   -   -   -   -   -   -   -   -   --  -   -   -   -   --      --  -   -   -   -   -
router.get("/getmodeldetails", async (req, res) => {
    try {
        // const modeldata = await NewCarData.find(req.query).limit(MAX_CAR_PER_PAGE).skip(MAX_CAR_PER_PAGE * page);
        const modeldata = await NewCarData.find(req.query);
        // const ALL_CARS = await NewCarData.find(req.query);
        // const NO_OF_CARS = (ALL_CARS.length);
        // const NO_OF_PAGES = Math.ceil(NO_OF_CARS / MAX_CAR_PER_PAGE);
        console.log(req.query);
        // console.log(NO_OF_CARS);
        // console.log(NO_OF_PAGES);
        res.status(201).json(modeldata);


    } catch (error) {
        res.status(422).json(error);

    }
})

//For new Data 10/02/2023
router.get("/getmodelnewdetails", async (req, res) => {
    try {
        // const modeldata = await NewCarData.find(req.query).limit(MAX_CAR_PER_PAGE).skip(MAX_CAR_PER_PAGE * page);
        const modeldata = await CarData.find(req.query);
        // const ALL_CARS = await NewCarData.find(req.query);
        // const NO_OF_CARS = (ALL_CARS.length);
        // const NO_OF_PAGES = Math.ceil(NO_OF_CARS / MAX_CAR_PER_PAGE);
        // console.log(req.query);
        // console.log(NO_OF_CARS);
        // console.log(NO_OF_PAGES);
        res.status(201).json(modeldata);


    } catch (error) {
        res.status(422).json(error);

    }
})



// --  --  --  --  --  --  --   --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --- --  --

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -Price Details- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

router.get('/pricedetail/:id', async (req, res) => {
    try {
        let pricedetail = await PriceDetails.find({ Version_UID: req.params.id, city_name: "Bangalore" });
        pricedetail.length > 0 ? res.status(201).json(pricedetail) : res.status(201).json("No Data");
    } catch {
        res.status(400).json("Error")
        console.log("error")
    }
});


// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --


//login route

router.post('/signin', async (req, res) => {
    // console.log(req.body);
    // res.json({message:"Awesome"});
    try {
        const { email, pincode } = req.body;
        if (!email || !pincode) {
            return res.status(400).json({ error: "Please Enter the Credentials" })
        }
        const userLogin = await User.findOne({ email: email });
        console.log(userLogin);

        if (!userLogin) {
            res.status(400).json({ error: " User Not Found" });
        } else {
            res.json({ message: " User SignIn Successful" });
        }

    } catch (err) {
        console.log(err);
    }
})



router.post('/dealer', async (req, res) => {
    if (req.body.pin.length > 0) {
        let data = await Dealer_Details.find({ brand_name: req.body.brand, city_name: req.body.city, pincode: req.body.pin })
        res.send(data)
    } else {
        let data = await Dealer_Details.find({ brand_name: req.body.brand, city_name: req.body.city })
        res.send(data)
    }
})

router.get('/car_brands', async (req, res) => {
    let data = await CarData.find().select('brand -_id')
    data = data.map((item) => item.brand)
    res.send([...new Set(data)])
})

router.get('/city_names', async (req, res) => {
    let data = await City_Details.find().select(["City Name"])
    res.send(data)
})

router.get('/model_prices/:id', async (req, res) => {
    let data = await Model_Prices.find({ model_id: req.params.id })

    data.length > 0 ? res.send(data) : res.json("No Data")
})

router.get('/version_data/:id', async (req, res) => {
    let data = await CarData.find({ model_id: req.params.id }).select('model_name version_name displacement engine_type transmission_type city_mileage transmission_type -_id')
    res.send(data)
})

router.get('/version_prices/:id', async (req, res) => {
    let data = await Version_Prices.find({ model_id: req.params.id }).select('min_price version_name -_id')
    data.length > 0 ? res.send(data) : res.json("No Data")
})

router.get('/single_version/:id/:mid', async (req, res) => {
    let data = await Version_Prices.find({ model_id: req.params.mid, version_name: req.params.id }).select("min_price max_price -_id")
    res.send(data)
})

router.get('/all_model_prices/:brand', async (req, res) => {
    let data = await Model_Prices.find({ brand: req.params.brand })
    res.send(data)
})

router.get('/all_body_types', async (req, res) => {
    let data = await CarData.find().select('body_type -_id')
    let newData = data.filter((value, index) => {
        const _value = JSON.stringify(value);
        return index === data.findIndex(obj => {
            return JSON.stringify(obj) === _value;
        });
    });
    res.send(newData)
})

router.get('/all_fuel_types', async (req, res) => {
    let data = await CarData.find().select('fuel_type -_id')
    let newData = data.filter((value, index) => {
        const _value = JSON.stringify(value);
        return index === data.findIndex(obj => {
            return JSON.stringify(obj) === _value;
        });
    });
    res.send(newData)
})


router.get('/all_seating_types', async (req, res) => {
    let data = await CarData.find().select('seating_capacity -_id')
    let newData = data.filter((value, index) => {
        const _value = JSON.stringify(value);
        return index === data.findIndex(obj => {
            return JSON.stringify(obj) === _value;
        });
    });
    res.send(newData.sort())
})

router.get('/filter/:type/:value', async (req, res) => {
    let { type, value } = req.params
    let filter = {}
    filter[type] = value

    let data = await CarData.find(filter).select('fuel_type model_name brand transmission_type uid model_id -_id')

    let newData = data.filter((value, index, self) => {
        return index === self.findIndex((t) => {
            return t.model_name == value.model_name
        })
    })

    res.send(newData)
})

router.get('/filter_model_prices', async (req, res) => {
    let data = await Model_Prices.find().select('min_price max_price model_id -_id')
    res.send(data)
})

router.get('/filter_range/:value', async (req, res) => {
    let { value } = req.params
    let data = await Model_Prices.find({ min_price: { $lte: value } })
    res.send(data)
})

router.get('/filter_range_brand/', async (req, res) => {
    let data = await CarData.find().select('fuel_type model_name brand transmission_type uid model_id -_id')
    res.send(data)
})

// router.get('/dealer_model/:brand', async(req,res)=>{
//     let data = await CarData.find({brand: req.params.brand}).select('model_name -_id')
//     let newData = data.filter((value, index, self) => {
//         return index === self.findIndex((t) => {
//             return t.model_name == value.model_name
//         })
//     })
//     res.send(newData)
// })

router.get('/dealer_brand/:brand/:model?/:pincode?', async (req, res) => {
    if (req.params.pincode == "undefined") {
        let data = await Dealer_Details.find({ brand_name: req.params.brand })
        res.send(data)
    } else {
        let data = await Dealer_Details.find({ brand_name: req.params.brand, pincode: req.params.pincode })
        res.send(data)
    }

})

router.post('/price_query', async (req, res) => {
    let { name, email, phone, pincode, car } = req.body

    let query = new Price_Query({
        name: name,
        email: email,
        number: phone,
        pincode: pincode,
        car: car
    })

    let data = await PriceQuery.findOne({ car: car, name: name, email: email })

    if (data) {
        res.status(400).send("Query Already Exists")
    } else {
        query.save((err) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).send("Will Contact You Soon")
            }
        })
    }




})

router.get('/model_car/:brand/:model', async (req, res) => {
    let data = await CarData.find({ brand: req.params.brand, model_name: req.params.model }).select("fuel_type transmission_type seating_capacity -_id")
    res.send(data)
})







module.exports = router;