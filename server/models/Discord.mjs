import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const discordUserSchema = new Schema({
  user_key: {
    type: String,
    required: true,
    unique: true,
  },
  discord_handle: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});

const DiscordUser = model('DiscordUser', discordUserSchema);

export default DiscordUser;