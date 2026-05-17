import express from 'express';
import { destinations } from '../data/destinations.js';

const router = express.Router();

// GET /api/destinations
router.get('/', (req, res) => {
  res.json(destinations);
});
// GET /api/destinations/:id

export default router;
