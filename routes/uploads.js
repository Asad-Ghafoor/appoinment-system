const router = require('express').Router();
const multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads")
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname)
        }
    })
});

router.post("/multer", upload.single("file-upload"), (req, res) => {
    try {
        console.log(req)
        res.json({ status: 1, name: req.file.filename });
    }
    catch (err) {
        res.send({ status: -1, message: err.message });
    }
});

module.exports = router;