import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema(
  {
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Favorite = mongoose.model('Favorite', favoriteSchema);
