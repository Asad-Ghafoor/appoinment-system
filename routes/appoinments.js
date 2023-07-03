const router = require('express').Router();
const Appoinment = require('../models/appoinment');


// create the api of the create appoinmets whose type is POST  
//in this api the req come from the FrontEnd 
// in this api the res send the the frontend 
router.post('/create', async (req, res) => {
    // all the procedure is completed in try-block which is active when there is no error in your api
    try {
        // make the varible b and store the requested data of frontend 
        let b = req.body;
        // in this we create the document in the database and store the request data come from frontend which is stored in b and go to schema and validate and save in database
        // make the varible data in which the we store the appoinment data
        let data = await Appoinment.create(b);
        // it give the response and return the data
        res.json({ status: 1, data });
    }
    // Catch-block show the error when there is a mistake in your API
    catch (err) {
        // if error occur which send the message of error
        res.json({ status: -1, message: err.message })
    }
})

router.get('/get/:_id', async (req, res) => {
    try {
        // console.log('data', "-=-=-=-=-=- 17")
        // console.log(req.params._id)
        let p = req.params._id;
        let data = await Appoinment.find({ $or: [{ doctor: p }, { patient: p }], status: { $nin: [-1] } })
            .populate('doctor patient', '-password');
        console.log(data);
        if (data) return res.json({ status: 1, data });
        res.json({ status: 0, message: 'error' });
    }
    catch (err) {
        res.json({ status: -1, message: err.message });
        // console.log('error');
    }
})

router.get('/appoinments', async (req, res) => {
    try {
        let data = await Appoinment.find({ status: { $nin: [-1] } }).populate('doctor patient', '-password');
        res.json({ status: 1, data });
        console.log(data)
    }
    catch (err) {
        res.json({ status: -1, message: err.message });
    }
})

module.exports = router;