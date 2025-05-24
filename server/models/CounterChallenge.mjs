import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const counterChallengeSchema = new Schema({
  challengeId: {
    type: Types.ObjectId,
    required: true,
    ref: 'Challenge', // Assumes you have a separate Challenge model
  },
  challenge: {
    type: String,
  },
  punishment: {
    type: String,
  },
  team: {
    type: String,
    enum: ['pro', 'against'], // Customize enum values
    required: true,
  },
  playerId: {
    type: Types.ObjectId,
    required: true,
    ref: 'Player', // Assumes a Player model exists
  },
  action: {
    type: String,
    enum: ['accept', 'reject', 'none'], // Customize actions
    required: true,
  },
  status: {
    type: String,
    enum: ['locked', 'none'], // Customize actions
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
}, {
  collection: 'counter-challenge'
});

const CounterChallenge = model('CounterChallenge', counterChallengeSchema);

export default CounterChallenge;