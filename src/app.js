const express = require('express');
const multer = require('multer');
const uploadFile= require('./services/storage.service');
const app = express();
app.use(express.json());

const upload = multer({storage: multer.memoryStorage()})



app.post('/create-post', upload.single("image"), async (req, res) => {

    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    if (!req.file) {
        return res.status(400).json({
            message: "Image not received"
        });
    }

    return res.status(200).json({
        message: "Post created successfully",
        caption: req.body.caption,
        filename: req.file.originalname
    });
  const result= await uploadFile(req.file.buffer)
  console.log(result);
});
module.exports = app;
