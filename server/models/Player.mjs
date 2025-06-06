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
  },
  alternate_names: {
    type: [String],
  }
}, {
  timestamps: true,
  collection: 'players'
});

const Player = model('Player', playerSchema);

export default Player;