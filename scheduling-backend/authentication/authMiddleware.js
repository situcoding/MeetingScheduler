/* authentication/authMiddleware.js */
import jwt from 'jsonwebtoken';

const SECRET_KEY = '2d2d9154cfa511986f9c21c596789329db50411269a695d66a65ca64940c64be'; 

export function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    req.userId = user.userId;
    req.role = user.role;

    next();
  });
}

/* authMiddleware.js */
import { LoginLog } from '../models/Login_logs.js'; // Import the correct model for login logs

export async function logAdminLogin(req, res, next) {
  try {
    /* Extract user information from the token or session */
    const { userId, role } = req; // Use req.userId and req.role

    /* Log the login information */
    await LoginLog.create({
      admin_user_id: userId, // Use userId from req
      role: role, // Use role from req
      // ...
    });

    next();
  } catch (error) {
    // Handle errors
    console.error('Error logging login:', error);
    // Continue with the next middleware or route
    next();
  }
}
