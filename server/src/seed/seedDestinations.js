import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { Destination } from '../models/Destination.js';
import { destinations } from './destinations.js';

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Destination.deleteMany();

    await Destination.insertMany(destinations);

    console.log('Destinations seeded');

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
}

seed();
