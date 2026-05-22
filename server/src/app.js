import express from 'express';
import cors from 'cors';
import destinationRoutes from './routes/destinationRoutes.js';
import favoritesRoutes from './routes/favoritesRoutes.js';
import tripRouter from './routes/tripRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

// middleware
app.use(cors());
app.use(express.json());
// routes
app.use('/api/destinations', destinationRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/trips', tripRouter);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

//error handler
app.use(errorHandler);
//upload
app.use('/uploads', express.static('uploads'));
export default app;
