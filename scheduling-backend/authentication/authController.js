/* authentication/authController.js */

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';
import Client from '../models/Client.js';
import Login_logs from '../models/Login_logs.js';  
import db from '../database.js';

const SECRET_KEY = 'YourActualSecretKeyHere';

export async function registerAdmin(req, res) {
  try {
    const { userId, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await AdminUser.register({
      userId,
      password: hashedPassword,
      role: 'admin_user',
    });

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function loginAdmin(req, res) {
  try {
    const { userId, password } = req.body;
    const admin = await AdminUser.findOne({ where: { email } });
    console.log('Admin:', admin);

    if (!admin || !bcrypt.compareSync(password, admin.password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    await Login_logs.create({  
      admin_user_id: admin.id,
      role: admin.role,
      ip_address: req.ip,
      user_agent: req.get('User-Agent'),
      loginTimestamp: new Date(),
      status: 'success'
    });

    const token = jwt.sign({ id: admin.id, role: admin.role }, SECRET_KEY);

    res.status(200).json({ message: 'Admin login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function registerClient(req, res) {
  try {
    const { userId, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await Client.register({
      userId,
      password: hashedPassword,
      role: 'client',
    });

    res.status(201).json({ message: 'Client registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function loginClient(req, res) {
  try {
    const { userId, password } = req.body;
    const client = await Client.findOne({ where: { email } });

    if (!client || !bcrypt.compareSync(password, client.password)) {
      return res.status(401).json({ message: 'Invalid user ID or password' });
    }

    await Login_logs.create({  
      client_id: client.id,
      role: 'client',
      ip_address: req.ip,
      user_agent: req.get('User-Agent'),
      loginTimestamp: new Date(),
      status: 'success'
    });

    console.log('Client:', client);  

    const token = jwt.sign({ userId: client.id, role: 'client' }, SECRET_KEY);

    res.status(200).json({ message: 'Client login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
