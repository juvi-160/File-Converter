const express = require('express');
const path = require('path');
const multer = require('multer');
const bodyparser = require('body-parser');
const router = express.Router();
const docxtopdf = require('docx-pdf');

router.use(express.static('uploads'));

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

let upload = multer({ storage: storage });

router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());

router.post('', upload.array('file'), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files uploaded.');
    }

    const inputFilePath = req.files[0].path;
    const outputFilePath = Date.now() + "output.pdf";

    docxtopdf(inputFilePath, outputFilePath, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            res.download(outputFilePath, (err) => {
                if (err) {
                    // Handle any errors that occur during the download, if needed.
                    console.error('Download error:', err);
                }
            });
        }
    });
});

module.exports = router;
