const mongoose = require('mongoose');

const TestCaseSchema = mongoose.Schema({
  test_case: {
    type: String,
  },
});

// const Testcase = mongoose.model('Testcase', TestCaseSchema);

export default TestCaseSchema;
