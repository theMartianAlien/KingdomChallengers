import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const accountSchema = new Schema({
  nickname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  discord_handle_id: {
    type: Types.ObjectId,
    ref: 'DiscordUser',
    required: true,
  },
  player_id: {
    type: Types.ObjectId,
    ref: 'Player',
    required: true,
  },
  image: {
    type: String, // Typically a URL or file path
    default: '',
  }
}, {
  timestamps: true
});

const Account = model('Account', accountSchema);

export default Account;