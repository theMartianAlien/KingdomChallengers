import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const challengeSchema = new Schema({
  issuer: {
    type: Types.ObjectId,
    required: true,
    ref: 'Account', // Reference to an Account schema
  },
  status: {
    type: String,
    enum: ['ready', 'locked', 'posted', 'completed', 'expired'], // You can adjust these values
    default: 'ready',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  statement: {
    type: String,
    required: true,
  },
  loserPunishment: {
    type: String,
    required: true,
  },
  challengeType: {
    type: String,
    enum: ['open', 'close'],
    required: true,
  },
  challengeEndDate: {
    type: Date,
    required: true,
  },
  counters:
    [{
      type: Schema.Types.ObjectId,
      ref: 'CounterChallenge'
    }],
  participants: [
    {
      type: Types.ObjectId,
      ref: 'Account', // Reference to Account model
    }
  ],
  converted: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
});

const Challenge = model('Challenge', challengeSchema);

export default Challenge;