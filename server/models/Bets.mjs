import mongoose from 'mongoose';

const { Schema } = mongoose;

const challengeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['ongoing', 'void', 'complete'],
    required: true
  },
  teamA: [{
    type: Schema.Types.ObjectId,
    ref: 'Player',
    required: true
  }],
  teamB: [{
    type: Schema.Types.ObjectId,
    ref: 'Player',
    required: true
  }],
  text: {
    type: String,
    required: false
  },
  punishment: {
    type: String,
    required: false
  },
  link: {
    type: String,
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+\..+/.test(v);
      },
      message: props => `${props.value} is not a valid URL`
    },
    required: false
  },
  winner: {
    type: String,
    enum: ['teamA', 'teamB', 'none'],
    default: 'none'
  },
  chapter: {
    type: Number,
    default: null
  },
  date_created: {
    type: Date,
    default: Date.now
  },
  date_completed: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'bets',
  timestamps: true 
});

export default mongoose.model('Bet', challengeSchema);
