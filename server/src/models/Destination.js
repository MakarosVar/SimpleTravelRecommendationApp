import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema(
  {
    name: String,
    country: String,
    type: String,
    description: String,
    imageUrl: String,
    tags: [String],
  },
  {
    timestamps: true,
  },
);

export const Destination = mongoose.model(
  'Destination',
  destinationSchema,
);
