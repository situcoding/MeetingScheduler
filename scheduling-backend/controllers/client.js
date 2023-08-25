/* controllers/client.js */


import Client from '../models/Client.js';
import LoginLog from '../models/Login_logs.js';

export async function registerClient(req, res) {
    try {
        const {
            first_name,
            middle_name,
            last_name,
            birthday,
            gender,
            street,
            city,
            state,
            postal_code,
            country,
            email,
            mobile,
            company_school,
            client_id,
            password
        } = req.body;

        const newClient = await Client.create({
            first_name,
            middle_name,
            last_name,
            birthday,
            gender,
            street,
            city,
            state,
            postal_code,
            country,
            email,
            mobile,
            company_school,
            client_id,
            password
        });

        res.status(201).json({ message: 'Client created successfully!', client: newClient });

    } catch (error) {
        console.error('Error creating client:', error);
        res.status(500).json({ message: 'Error creating client', error: error.message });
    }
}

export async function getAllClients(req, res) {
    try {
        const clients = await Client.findAll(); // Fixed this line
        res.status(200).json(clients);
    } catch (error) {
        console.error('Error retrieving clients:', error);
        res.status(500).json({ message: 'Error retrieving clients', error: error.message });
    }
}

export async function loginClient(req, res) {
    try {
        await LoginLog.create({
            client_id: req.userId,  // Replace with the logic to get the logged-in user's ID
            ip_address: req.ip,
            user_agent: req.get('User-Agent'),
            loginTimestamp: new Date(),
            role: 'client', // Assuming role is 'client' for client logins
            status: 'successful'
        });

        res.status(200).json({ message: "Logged in successfully" });
    } catch (error) {
        console.error('Error logging in:', error); // Added for debugging
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
}
