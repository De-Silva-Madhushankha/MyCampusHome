import express from 'express';
import { getAccommodations, getAccommodationById, getUserAccommodations, updateAccommodationStatus, updateAccommodation, deleteAccommodation } from '../controllers/accommodationController.js';

const router = express.Router();

router.get('/', getAccommodations);
router.get('/:id', getAccommodationById);
router.get('/user/:userId', getUserAccommodations);
router.put('/:id', updateAccommodation);
router.patch('/:id', updateAccommodationStatus)
router.delete('/:id', deleteAccommodation);

export default router;