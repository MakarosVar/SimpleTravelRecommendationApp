import express from 'express';
import cors from 'cors';
import destinationRoutes from './routes/destinationRoutes.js';

const app = express();

// middleware
app.use(cors());
app.use(express.json());
// routes
app.use('/api/destinations', destinationRoutes);

export default app;
