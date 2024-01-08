const express = require('express');
const mongoose= require('mongoose')
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();


const docxtopdfRoutes = require('./routes/docxtopdf');
const uploadDocRoutes = require('./routes/uploadDoc');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    }
});

const upload = multer({ storage: fileStorage });

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/docxtopdf', docxtopdfRoutes);
app.use('/uploadDoc', uploadDocRoutes);


const uploadedFiles = []; 

app.get('/', (req, res) => {
    res.render('home');
});


app.get('/uploadimg',(req,res) => {
    res.render('uploadimg')
})

app.get('/uploaddoc',(req,res) => {
    res.render('uploaddoc')
})

app.get('/docxtopdf',(req,res) => {
    res.render('docxtopdf')
})

app.get('/jpgtopng',(req,res) => {
    res.render('jpgtopng')
})

app.post('/uploadImg', upload.array('images'), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files uploaded.');
    }
    res.render('uploadimg');
});


app.listen(3000, () => {
    console.log('Serving on port 3000');
});
