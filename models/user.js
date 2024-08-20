import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  number: {
    type: String,
  },
  character: {
    type: String,
  },
});

usersSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.__v;
    return ret;
  }
});

export default mongoose.model('users', usersSchema);
