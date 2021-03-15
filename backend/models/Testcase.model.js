const mongoose = require('mongoose');

const TestCaseSchema = new mongoose.Schema({
  test_case: {
    type: String,
  },
});

module.exports = mongoose.model('Testcase', TestCaseSchema);
