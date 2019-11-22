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
    enum: ['patient', 'doctor', 'admin'],
    default: 'patient',
    required: true
  },
  phone: {
    type: Number,
    default: null,
    required: false
  },
  dateofbirth: {
    type: Date,
    default: null,
    required: false
  },
  gender: {
    type: String,
    default: null,
    required: false
  },
  address: {
    type: String,
    default: null,
    required: false
  },
  localgovernment: {
    type: String,
    default: null,
    required: false
  },
  state: {
    type: String,
    default: null,
    required: false
  },
  country: {
    type: String,
    default: null,
    required: false
  },
  bloodgroup: {
    type: String,
    default: null,
    required: false
  },
  height: {
    type: String,
    default: null,
    required: false
  },
  weight: {
    type: String,
    default: null,
    required: false
  },
  genotype: {
    type: String,
    default: null,
    required: false
  },
  maritalstatus: {
    type: String,
    default: null,
    required: false
  }
});


UserSchema.plugin(UniqueValidator);

const User = mongoose.model('User', UserSchema);

exports.User = User;
