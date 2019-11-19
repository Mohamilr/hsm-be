import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import jsonResponse from '../helper/responseHandler';
require('dotenv').config();

const login = (req, res) => {
  const { email, password } = req.body;

  if (email === '' || password === '') {
    return jsonResponse.error(res, 'error', 400, 'Input field cannot be blank');
  }

  User.findOne({
    email: email
  }).then(user => {
    if (!user) {
      return jsonResponse.error(res, 'error', 401, 'Invalid Credentials');
    }
    bcrypt.compare(password, user.password).then(valid => {
      if (!valid) {
        return jsonResponse.error(res, 'error', 401, 'Invalid Credentials');
      }
      const token = jwt.sign(
        {
          userId: user._id
        },
        'secret',
        {
          expiresIn: '24h'
        }
      );
      
      const data = {
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        },
        token
      };
      return jsonResponse.success(res, 'success', 200, data);
    });
  });
};

module.exports = login;
