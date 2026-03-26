const ImageKit =require("@imagekit/nodejs");

const imagekit = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
   
})

async function uploadImage(file) {
    try {
        const result = await imagekit.files.upload({
            file: file.buffer.toString("base64"), // convert buffer
            fileName: file.originalname
        });

        return result;
    } catch (error) {
        console.error("Upload error:", error.message);
        throw error;
    }
}

module.exports = uploadImage;
