import express from 'express';
import cors from 'cors';
import destinationRoutes from './routes/public/destinationRoutes.js';
import favoritesRoutes from './routes/user/favoritesRoutes.js';
import tripRouter from './routes/user/tripRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/admin/destinationRoutes.js';
import adminPackageRoutes from './routes/admin/packageRoutes.js';
import publicPackageRoutes from './routes/public/packageRoutes.js';

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
app.use('/api/admin', adminPackageRoutes);
app.use('/api/packages', publicPackageRoutes);

//error handler
app.use(errorHandler);
//upload
app.use('/uploads', express.static('uploads'));
export default app;
