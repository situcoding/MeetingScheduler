/* controllers/admin.js */

import AdminUser from '../models/AdminUser.js';
import LoginLog from '../models/Login_logs.js';

/*Function to register an admin user */
export async function registerAdminUser(req, res) {
    try {
        const adminUser = await AdminUser.create(req.body);
        res.status(201).json(adminUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/* Function to get all admin users (accessible only by Admin_Master) */
export async function getAllAdminUsers(req, res) {
    try {
        console.log('User ID from request:', req.userId);
        const adminUserId = req.userId; /* Assuming the JWT contains the userId */

        const adminUser = await AdminUser.findByPk(adminUserId);

        if (!adminUser) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (adminUser.role !== 'Admin_Master') {
            return res.status(403).json({ message: 'You do not have permission to view this data.' });
        }

        const adminUsers = await AdminUser.findAll();
        res.status(200).json(adminUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/* Login function (assuming that you will implement authentication logic here) */
export async function loginUser(req, res) {
    try {
        /* Assuming you've successfully authenticated the admin user */
        const loggedInAdmin = req.user; /* Get the authenticated admin user from middleware */
        
        let role = 'admin_user'; /* Default role*/

        if (loggedInAdmin.role === 'Admin_Master') {
            role = 'admin_master';
        }

        await LoginLog.create({
            admin_user_id: loggedInAdmin.id, /* Replace with the correct property for admin's ID */
            loginTimestamp: new Date(),
            role: role /* Log the role based on user's role */
        });

        res.status(200).json({ message: "Admin logged in successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

