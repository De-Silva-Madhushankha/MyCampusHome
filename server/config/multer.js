import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'images',
    // allowed_formats: ['jpg', 'jpeg', 'png'], // Restrict formats
  },
});

// const fileFilter = (req, file, cb) => {
//   const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];

//   if (validTypes.includes(file.mimetype)) {
//     cb(null, true); // Accept the file
//   } else {
//     cb(new Error('Only JPEG and PNG images are allowed!'), false); // Reject the file
//   }
// };

const upload = multer({
  storage,
//   fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

export default upload;
