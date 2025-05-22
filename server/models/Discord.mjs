import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const discordUserSchema = new Schema({
  user_key: {
    type: String,
    required: true
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
}, {
  collection: 'discord_users'
});

const Discord = model('discord_users', discordUserSchema);

export default Discord;