import express from 'express';
import cors from 'cors';
import destinationRoutes from './routes/destinationRoutes.js';
import tripRouter from './routes/tripRoutes.js';

const app = express();

// middleware
app.use(cors());
app.use(express.json());
// routes
app.use('/api/destinations', destinationRoutes);
app.use('/api/trips', tripRouter);

export default app;
