import express from 'express';
import { createListing } from '../controllers/listingController.js';
import upload from '../config/multer.js';

const router = express.Router();

router.post('/list', upload.array('photos', 10), createListing);

export default router;