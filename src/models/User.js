import mongoose from 'mongoose';
import UniqueValidator from 'mongoose-unique-validator';
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'patient',
    required: true
  }
});

UserSchema.plugin(UniqueValidator);

const User = mongoose.model('User', UserSchema);

exports.User = User;
