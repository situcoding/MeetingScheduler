import express from 'express';
import { createMeeting, getAllMeetings } from '../../controllers/meeting.js';
import AdminUser from '../../models/AdminUser.js';
const router = express.Router();

router.post('/', createMeeting);
router.get('/', getAllMeetings);

/* ... Add other routes for update, delete, etc. ... */

export default router;
