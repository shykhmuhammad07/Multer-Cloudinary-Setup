import express from "express";
import upload from "./MiddleWare/Multer.js";
import mongoose from "./Config/db.js";
import modelSchema from "./model/db_Schema.js";
import { uploadOnCloudinary } from "./Config/Cloudinary.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("server is running");
});

app.post("/profile", upload.single("image"), async (req, res) => {
  try {
    const localPath = req.file?.path;

    if (!localPath) {
      return res.status(400).json({ msg: "File not received" });
    }

    const cloud = await uploadOnCloudinary(localPath);

    if (!cloud) {
      return res.status(500).json({ msg: "Cloudinary upload failed" });
    }

    await modelSchema.create({
      imageUrl: cloud.secure_url,
    });

    return res.status(200).json({
      msg: "File uploaded",
      success: true,
      url: cloud.secure_url,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Upload failed",
      error,
    });
  }
});

mongoose.connection.on("open", () => {
  console.log("DataBase Connected Successflly");
});

mongoose.connection.on("error", () => {
  console.log("DataBase Connected Successflly");
});

app.listen(process.env.PORT, () => console.log("Server is Listening on 8000"));
