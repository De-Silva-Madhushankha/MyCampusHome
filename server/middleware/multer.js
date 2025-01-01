import multer from 'multer';

// Configure multer to store files in memory
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { files: 5, fileSize: 5 * 1024 * 1024 }, // Limit to 5 files
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

export default upload;