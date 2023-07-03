const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const multer = require('multer');


const salt = 10;


router.post('/register', async (req, res) => {
    try {
        let b = req.body;
        let data = await User.findOne({ email: b.email, status: { $nin: -1 } });
        if (data) return res.json({ status: 0, message: 'email Already Exist' })
        b.password = await bcrypt.hash(b.password, salt);
        data = await User.create(b);
        res.json({ status: 1, data });
    }
    catch (err) {
        res.json({ status: -1, message: err.message });
    }
})


router.post('/login', async (req, res) => {
    try {
        let b = req.body;
        let data = await User.findOne({ email: b.email, status: 1 });
        let password = await bcrypt.compare(b.password, data.password)
        data.password = undefined;
        if (password) return res.json({ status: 1, data })
        res.json({ status: 0, message: 'email/password not matched' })
    }
    catch (err) {
        res.json({ status: -1, message: err.message })
    }
})

router.get('/getAllDoctors', async (req, res) => {
    try {
        let data = await User.find({ userType: "Doctor", status: 1 })
        if (data) return res.json({ status: 1, data })
        res.json({ status: 0, message: 'error' })
    }
    catch (err) {
        res.json({ status: -1, message: err.message })
    }
})

router.get('/getAllPatient', async (req, res) => {
    try {
        let data = await User.find({ userType: 'Patient', status: { $nin: -1 } }, "-password")
        res.json({ data })
    }
    catch (err) {
        res.json({ status: -1, message: err.message })

    }
});

router.get('/getDoctors', async (req, res) => {
    try {
        let data = await User.find({ userType: 'Doctor', status: { $nin: -1 } }, "-password")
        res.json({ status: 1, data });
    }
    catch (err) {
        res.json({ status: -1, message: err.message });

    }
})

router.delete('/delete/:_id', async (req, res) => {
    try {
        let data = await User.updateOne({ _id: req.params._id, status: { $nin: -1 } },
            { status: -1 }, { new: true });
        res.json({ status: 1, message: 'Data deleted successfully.' });
    }
    catch (err) {
        res.json({ status: -1, message: err.message })
    }
});

router.put('/update', async (req, res) => {
    try {
        let b = req.body;
        await User.updateOne({ _id: b._id }, b);
        res.json({ status: 1, message: "data updated successfully" });
    } catch (err) {
        res.json({ status: -1, message: err.message });
    }
});

module.exports = router;