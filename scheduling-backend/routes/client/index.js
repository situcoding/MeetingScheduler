import express from 'express';
import { registerClient, getAllClients } from '../../controllers/client.js';
import { loginClient } from '../../controllers/client.js';

const router = express.Router();

/* Route for registering a new admin user*/
router.post('/register', (req, res) => {
    console.log("Entered POST /client/register");
    registerClient(req, res);
});

/*Route for retrieving all clients*/
router.get('/all', (req, res) => {
    console.log("Entered GET /client/all");
    getAllClients(req, res);
});


router.post('/login', (req, res) => {
    console.log("Entered POST /client/login");
    loginClient(req, res); // Use loginClient controller
});
/* ... Other client-related routes ...*/

export default router;
