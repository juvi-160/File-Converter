const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');


const router = express.Router();

router.use(express.static('documents'));

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './documents');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

let upload = multer({ storage: storage });

router.use(express.urlencoded({ extended: false }));


router.post('', upload.array('document'), (req, res) => {
    res.redirect('uploaddoc');
});

router.get('/uploadedFiles', (req, res) => {
    const uploadedFiles = fs.readdirSync(path.join(__dirname, 'documents'));
    res.render('uploadedFiles', { files: uploadedFiles });
});

module.exports = router;

