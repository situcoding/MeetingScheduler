import express from 'express';
import availabilityController from '../../controllers/availability.js';

const router = express.Router();

// Create a new availability
router.post('/', availabilityController.createAvailability);

// Get all availabilities
router.get('/', availabilityController.getAllAvailabilities);

// Get a single availability by ID
router.get('/:id', availabilityController.getAvailabilityById);

// Update an availability by ID
router.put('/:id', availabilityController.updateAvailability);

// Delete an availability by ID
router.delete('/:id', availabilityController.deleteAvailability);

export default router;
