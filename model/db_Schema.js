import mongoose from "mongoose";

const image = mongoose.Schema({
  imageUrl: String,
});

const modelSchema = mongoose.model("Images", image);
export default modelSchema;
