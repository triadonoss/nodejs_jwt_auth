const { json } = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
const handleUpload = multer({ 
    storage: storage,
    limits: { fileSize: 5000000 },
/*     fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    }, */
});

const uploader = (req, res) =>{
    
    console.log(req?.file)
    return res.json().status(200)
}

  module.exports = { handleUpload, uploader }