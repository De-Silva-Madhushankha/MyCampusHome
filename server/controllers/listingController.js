import cloudinary from "../config/cloudinaryConfig.js";
import Accommodation from "../models/accommodationModel.js";

export const createListing = async (req, res) => {
  try {
    const uploadPromises = req.files.map((file) =>
      cloudinary.uploader.upload(file.buffer, {
        folder: "images",
      })
    );

    const uploadResults = await Promise.all(uploadPromises);
    const imageUrls = uploadResults.map((result) => result.secure_url);

    const newListing = new Accommodation({
      ...req.body,
      photos: imageUrls,
    });

    await newListing.save();
    res.status(201).json({ message: "Listing created", listing: newListing });
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).json({ error: "Server error" });
  }
};