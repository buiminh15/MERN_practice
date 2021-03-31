import httpStatus from 'http-status';
import WebTestcase from '../models/web_testcase.model';
import ApiError from '../utils/ApiError';

const getTestcasesByField = async () => {
  return WebTestcase.find({}, (err, testcases) => {
    if (err) throw new ApiError(httpStatus.NOT_FOUND, 'Not found any testcase')
  });
};
