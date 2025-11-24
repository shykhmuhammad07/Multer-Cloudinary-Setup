import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadOnCloudinary = async (localFile) => {
  try {
    if (!localFile) return null;

    const response = await cloudinary.uploader.upload(localFile, {
      resource_type: "auto",
    });

    // delete file after upload
    fs.unlinkSync(localFile);

    return response;

  } catch (error) {
    console.log("Cloudinary Error:", error);

    if (fs.existsSync(localFile)) {
      fs.unlinkSync(localFile);
    }

    return null;
  }
};

export { uploadOnCloudinary };
