import express from 'express';
import cors from 'cors';
import destinationRoutes from './routes/destinationRoutes.js';
import favoritesRoutes from './routes/favoritesRoutes.js';
import tripRouter from './routes/tripRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// middleware
app.use(cors());
app.use(express.json());
// routes
app.use('/api/destinations', destinationRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/trips', tripRouter);

//error handler
app.use(errorHandler);

export default app;
