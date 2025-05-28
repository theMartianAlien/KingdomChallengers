import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const counterChallengeSchema = new Schema({
  challengeId: {
    type: Types.ObjectId,
    required: true,
    ref: 'Challenge',
  },
  challenge: {
    type: String,
  },
  punishment: {
    type: String,
  },
  team: {
    type: String,
    enum: ['pro', 'against'],
    required: true,
  },
  playerId: {
    type: Types.ObjectId,
    required: true,
    ref: 'Player',
  },
  action: {
    type: String,
    enum: ['accept', 'reject', 'none'],
    required: true,
  },
  status: {
    type: String,
    enum: ['locked', 'none'],
  }
}, {
  timestamps: true,
  collection: 'counter_challenge'
});

const CounterChallenge = model('CounterChallenge', counterChallengeSchema);

export default CounterChallenge;