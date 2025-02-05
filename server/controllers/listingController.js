import { Readable } from 'stream';
import cloudinary from '../config/cloudinaryConfig.js';
import Accommodation from '../models/accommodationModel.js';

export const createListing = async (req, res) => {
  try {
    let amenities = req.body.amenities;
    if (typeof amenities === 'string') {
      amenities = amenities.split(',').map(item => item.trim());
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No photos uploaded." });
    }


    // Function to upload a single file using streams
    const streamUpload = (buffer, mimetype, originalname) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "images", public_id: originalname.split('.')[0], resource_type: 'auto' },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        const readable = new Readable();
        readable._read = () => {}; // _read is required but you can noop it
        readable.push(buffer);
        readable.push(null);
        readable.pipe(stream);
      });
    };

    // Upload all files
    const uploadPromises = req.files.map((file, index) => {
      return streamUpload(file.buffer, file.mimetype, file.originalname);
    });

    // Await all uploads
    const uploadResults = await Promise.all(uploadPromises);
    const imageUrls = uploadResults.map((result) => result.secure_url);

    // Create a new Accommodation listing
    const newListing = new Accommodation({
      ...req.body,
      amenities,
      photos: imageUrls, // Replace File objects with URLs
    });

    await newListing.save();
    // Respond with success
    res.status(201).json({ message: "Listing created successfully.", listing: newListing });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error." });
  }
};
