import {Schema,model} from 'mongoose';

const userSchema = new Schema({
  usid: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  city: {
    type: String
  }
}, { timestamps: true });

const User = model('User', userSchema);

export default User;
