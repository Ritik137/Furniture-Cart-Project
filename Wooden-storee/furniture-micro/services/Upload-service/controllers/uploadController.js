import cloudinary from "../config/cloudinary.js";

// Upload Image Controller
export const uploadImage = async (req, res) => {
  try {
    const file = req.file;

    // Cloudinary upload via stream
    const stream = cloudinary.uploader.upload_stream(
      { folder: "furniture" },
      (error, result) => {
        if (error) return res.status(500).json({ error });

        res.json({
          imageUrl: result.secure_url,
        });
      }
    );

    stream.end(file.buffer);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};