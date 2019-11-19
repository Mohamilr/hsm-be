let mongoose = require('mongoose');
require('dotenv').config();
const { DATABASE_URL } = process.env;

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log('Database connected');
      })
      .catch(err => {
        console.error(err);
      });
  }
}

module.exports = new Database();
