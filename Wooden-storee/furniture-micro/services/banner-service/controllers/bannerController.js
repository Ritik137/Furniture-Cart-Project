import Banner from "../models/Banner.js";
import cloudinary from "../config/cloudinary.js";

// ➕ Upload Banner
export const uploadBanner = async (req, res) => {
  try {
    console.log("File received:", req.file ? "Yes" : "No");
    console.log("Body:", req.body);

    // ❗ Check file
    if (!req.file || !req.file.buffer) {
      console.log("❌ No file buffer");
      return res.status(400).json({ msg: "Image is required" });
    }

    // 🔥 Upload to cloudinary
    const stream = cloudinary.uploader.upload_stream(
      { folder: "banner" },
      async (error, result) => {
        console.log("Cloudinary callback triggered");

        // ❗ Handle error properly
        if (error || !result) {
          console.error("Cloudinary error:", error);
          return res.status(500).json({
            msg: "Cloudinary upload failed",
            error: error?.message,
          });
        }

        console.log("✅ Cloudinary success:", result.secure_url);

        try {
          const banner = await Banner.create({
            image: result.secure_url,
            title: req.body.title || "",
            subtitle: req.body.subtitle || "",
          });

          console.log("✅ Banner saved:", banner);

          return res.status(201).json({
            msg: "Banner uploaded",
            banner,
          });
        } catch (dbError) {
          console.error("❌ DB error:", dbError);
          return res.status(500).json({
            msg: "DB save failed",
            error: dbError.message,
          });
        }
      }
    );

    // ❗ Important: send buffer
    stream.end(req.file.buffer);

  } catch (err) {
    console.error("❌ Controller error FULL:", err);
    res.status(500).json({
      msg: "Server error",
      error: err.message,
    });
  }
};
// 📖 Get latest banner
export const getBanner = async (req, res) => {
  try {
    const banner = await Banner.findOne().sort({ createdAt: -1 });
    res.json(banner);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch banner" });
  }
};