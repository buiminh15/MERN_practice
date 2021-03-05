const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
  test_case: {
    type: String,
  },
});

module.exports = mongoose.model('Login-demo', LoginSchema);
