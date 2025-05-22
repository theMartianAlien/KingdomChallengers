import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const playerSchema = new Schema({
  discord_handle: {
    type: String,
    required: true,
    unique: true,
  },
  display_name: {
    type: String,
    required: true,
  },
  discord_handler_id: {
    type: Types.ObjectId,
    required: true,
    unique: true,
  }
}, {
  timestamps: true
}, {
  collection: 'players' // <-- Make sure this matches your collection
});

const Player = model('Player', playerSchema);

export default Player;