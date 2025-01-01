import express from 'express';
import { createListing } from '../controllers/listingController.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.post('/list', upload.array('photos', 5), createListing);

export default router;