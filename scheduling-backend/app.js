import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import LoginLog from './models/Login_logs.js';

/* Import routes */
import adminRoutes from './routes/admin/index.js';
import availabilityRoutes from './routes/availability/index.js';
import clientRoutes from './routes/client/index.js';
import meetingRoutes from './routes/meeting/index.js';
import usersRoutes from './routes/users.js';
import mainRoutes from './routes/index.js';
import authRoutes from './authentication/authRoutes.js';
/* Import database setup */
import db from './database.js';
import './models/initAssociations.js';

const app = express();

/* Middleware for CORS */
app.use(cors({
   origin: 'http://localhost:4200',
   credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Use morgan for logging */
app.use(morgan('dev'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

/* Console Logging for all requests */
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.path}`);
    next();
});

/* Setup routes */
app.use('/admin', adminRoutes);
app.use('/availability', availabilityRoutes);
app.use('/client', clientRoutes);
app.use('/meeting', meetingRoutes);
app.use('/users', usersRoutes);
app.use('/', mainRoutes);

/* Dummy endpoint for testing */
app.get('/test', (req, res) => {
    res.send('Test route working');
});

/* Generic error handler with added logging */
app.use((err, req, res, next) => {
    console.error(`Error occurred on route: ${req.method} ${req.path}`);
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 4000;

db.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    return db.sync();
  })
  .then(() => {
    console.log('Database & tables created!');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  app.post('/login', async (req, res) => {
    try {
      /* Authentication logic */
      /* Assuming you verify the user's credentials and get the user's role, userId, and email */
  
      const authenticatedUser = await authenticateUser(req.body.email, req.body.password);
      const { role, userId, email } = authenticatedUser;
  
      // Log the login event
      const loginEventData = {
        loginTimestamp: new Date(),
        // Other fields
      };
  
      if (role === 'client') {
        loginEventData.client_id = userId;
        loginEventData.role = 'client';
        loginEventData.client_email = email;
      } else {
        loginEventData.admin_user_id = userId;
        loginEventData.role = role;
        loginEventData.admin_email = email;
      }
  
      await LoginLog.create(loginEventData);
  
      // Send successful login response
      res.status(200).json({ message: "Logged in successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.use('/auth', authRoutes);
export default app;
