import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const tokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    adminToken: {
        type: String,
        unique: true
    },
    accountId: {
        type: Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    loggedInTime: {
      type: Date,
      required: true,
    },
}, {
    timestamps: true
});

const Token = model('Token', tokenSchema);

export default Token;