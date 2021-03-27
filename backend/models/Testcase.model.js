const mongoose = require('mongoose');

const TestCaseSchema = new mongoose.Schema({
  test_case: {
    type: String,
  },
});

const Testcase = mongoose.model('Testcase', TestCaseSchema);

export default Testcase;
