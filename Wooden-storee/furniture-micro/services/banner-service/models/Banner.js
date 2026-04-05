import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Banner", bannerSchema);