import { string } from '@hapi/joi';
import mongoose, { Schema, model, Document } from 'mongoose';
export interface IUser extends Document {
  fullName: string;
  email: string;
  role: string;
  active: true;
  photo: string;
  password: string;
  created: Date;
}

const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, 'fullname not provided'],
  },
  email: {
    type: String,
    unique: [true, 'email already exists in database!'],
    required: [true, 'email not provided'],
    validate: {
      validator: function (v: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: '{VALUE} is not a valid email!',
    },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
  },
  active: {
    type: Boolean,
    default: true,
  },
  photo: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

const User = model<IUser>('User', userSchema);

export default User;
