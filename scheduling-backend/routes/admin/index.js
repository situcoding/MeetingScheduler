import express from 'express';
import { registerAdminUser, getAllAdminUsers, loginUser } from '../../controllers/admin.js';

const router = express.Router();

/* Route for registering a new admin user */
router.post('/register', (req, res) => {
    console.log("Entered POST /admin/register");
    registerAdminUser(req, res); // Use registerAdminUser
});

/* Route for retrieving all admin users */
router.get('/all', (req, res) => {
    console.log("Entered GET /admin/all");
    getAllAdminUsers(req, res); /* Use getAllAdminUsers */
});

/* Route for logging in an admin user */
router.post('/login', (req, res) => {
    console.log("Entered POST /admin/login");
    loginUser(req, res); // Use loginUser
});

/* ... Other admin-related routes ...*/

export default router;
