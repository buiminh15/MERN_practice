import httpStatus from 'http-status';
// import WebTestcase from '../models/web_testcase.model';
import WebTestcase from '../models/webtest.model';
import ApiError from '../utils/ApiError';

const getTestcasesByField = async (name) => {
  return WebTestcase.find({ name }, (err, testcases) => {
    if (err) throw new ApiError(httpStatus.NOT_FOUND, 'Not found any testcase')
  }).select('-createdAt -updatedAt -__v');
};

export default { getTestcasesByField }
