// authentication/authRoutes.js
import express from 'express';
import { registerAdmin, loginAdmin, registerClient, loginClient } from './authController.js';

const router = express.Router();

// Admin registration and login routes
router.post('/admin/register', registerAdmin);
router.post('/admin/login', loginAdmin);

// Client registration and login routes
router.post('/client/register', registerClient);
router.post('/client/login', loginClient);

export default router;
