
const express = require('express');
const multer = require('multer');

const uploadFile = require('./storage.service');

const app = express();

app.use(express.json());

const upload = multer({
    storage: multer.memoryStorage()
});

app.post('/create-post', upload.single('image'), async (req, res) => {

    try {

        console.log("Request body:", req.body);
        console.log("Uploaded file:", req.file);

        if (!req.file) {
            return res.status(400).json({
                message: "Image not received"
            });
        }

        // Upload image to ImageKit
        const result = await uploadFile(
            req.file.buffer,
            req.file.originalname
        );

        console.log("ImageKit response:", result);

        return res.status(200).json({
            message: "Image uploaded successfully",
            caption: req.body.caption,
            imageUrl: result.url,
            fileId: result.fileId
        });

        const post= await postModel.create({
            image: result.url,
            caption: req.body.caption
        })

    } catch (error) {

        console.error("Upload error:", error);

        return res.status(500).json({
            message: "Image upload failed",
            error: error.message
        });
        return res.status(201).json({
            message: "Post created successfully",
            post
        })

    }

});
app.get("/posts",async(req,res)=>{
    const posts = await postModel.find()
    return res.status(200).json({
        message:"Posts fetched successfully"
        posts
    })
})

module.exports = app;
