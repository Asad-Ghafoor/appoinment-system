const router = require('express').Router();
const Clinic = require('../models/clinic');
const User = require('../models/clinic');

router.post('/AddClinic', async (req, res) => {
    try {
        let b = req.body;
        let data = await Clinic.findOne({ name: b.name });
        if (data) return res.json({ status: 0, message: 'Name Must be unique' });
        data = await Clinic.create(b);
        res.json({ status: 1, data });
    }
    catch (err) {
        res.json({ status: -1, message: err.message, });
    }
})


router.get('/allhospitals', async (req, res) => {
    try {
        let data = await Clinic.find({ status: { $nin: -1 } });
        res.json({ status: 1, data });
    } catch (err) {
        res.json({ status: -1, message: err.message, });
    }
})



router.delete('/deleteClinics/:_id', async (req, res) => {
    try {
        let data = await Clinic.updateOne({ _id: req.params._id, status: { $nin: -1 } },
            { status: -1 }, { new: true });
        console.log(data);
        res.json({ status: 1, message: 'data Deleted Successfully' });
    }
    catch (err) {
        res.json({ status: -1, message: message.err });
    }
})


router.put('/update', async (req, res) => {
    try {
        let b = req.body;
        console.log(b)
        await Clinic.updateOne({ _id: b._id }, b);
        res.json({ status: 1, message: 'data Updated Successfully' })
    }
    catch (err) {
        res.json({ status: -1, message: err.message });
    }
});

module.exports = router;