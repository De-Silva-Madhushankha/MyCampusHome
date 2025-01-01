import { Readable } from 'stream';
import cloudinary from '../config/cloudinaryConfig.js';
import Accommodation from '../models/accommodationModel.js';

export const createListing = async (req, res) => {
  try {
    console.log('🔍 [createListing] Request received');

    // Log received files and body
    console.log('📂 [createListing] Received files:', req.files);
    console.log('📄 [createListing] Received body:', req.body);

    let amenities = req.body.amenities;
    if (typeof amenities === 'string') {
      amenities = amenities.split(',').map(item => item.trim());
    }

    if (!req.files || req.files.length === 0) {
      console.log('❌ [createListing] No photos uploaded.');
      return res.status(400).json({ error: "No photos uploaded." });
    }

    console.log('⬆️ [createListing] Starting Cloudinary uploads');

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
      console.log(`📤 [createListing] Uploading file ${index + 1}: ${file.originalname}`);
      return streamUpload(file.buffer, file.mimetype, file.originalname);
    });

    // Await all uploads
    const uploadResults = await Promise.all(uploadPromises);
    console.log('✅ [createListing] All files uploaded to Cloudinary');

    const imageUrls = uploadResults.map((result) => result.secure_url);
    console.log('🔗 [createListing] Image URLs:', imageUrls);

    console.log('📝 [createListing] Creating new Accommodation document');

    // Create a new Accommodation listing
    const newListing = new Accommodation({
      ...req.body,
      amenities,
      photos: imageUrls, // Replace File objects with URLs
    });

    console.log('💾 [createListing] Saving to MongoDB');
    await newListing.save();
    console.log('✅ [createListing] Listing saved to MongoDB');

    // Respond with success
    res.status(201).json({ message: "Listing created successfully.", listing: newListing });
    console.log('📬 [createListing] Response sent');
  } catch (error) {
    console.error("❌ [createListing] Error creating listing:", error);
    res.status(500).json({ error: error.message || "Internal Server Error." });
  }
};
