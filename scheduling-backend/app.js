/* app.js */


import express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';


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

const app = express();

app.use(morgan('combined'));
app.use(cors({
   origin: 'http://localhost:4200',
   credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* ... Other middleware setup ... */

/* Setup routes */
app.use('/admin', adminRoutes);
app.use('/availability', availabilityRoutes);
app.use('/client', clientRoutes);
app.use('/meeting', meetingRoutes);
app.use('/users', usersRoutes);
app.use('/', mainRoutes);

/* ... Other routes and error handling ... */

/* Start the database connection and create tables */
db.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    return db.sync();
  })
  .then(() => {
    console.log('Database & tables created!');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

/* Use authentication routes */
app.use('/auth', authRoutes);

/* Export the app */
export default app;
