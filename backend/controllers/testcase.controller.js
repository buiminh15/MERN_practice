import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import testcaseService from '../services/testcase.service';

const getTestcases = catchAsync(async (req, res) => {
  const testcases = await testcaseService.getTestcases();
  res.status(httpStatus.OK).json({ testcases });
});

const getTestcase = catchAsync(async (req, res) => {
  const _id = req.params.id
  const testcase = await testcaseService.getTestcase(_id);
  if (!testcase) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Testcase not found');
  }
  res.status(httpStatus.OK).json({ testcase });
});

const updateTestcase = catchAsync(async (req, res) => {
  const _id = req.params.id
  const updateBody = req.body
  const testcase = await testcaseService.updateTestcase(_id, updateBody);
  res.status(httpStatus.OK).json({ testcase });
});

const deleteTestcase = catchAsync(async (req, res) => {
  const _id = req.params.id
  const testcase = await testcaseService.deleteTestcase(_id);
  res.status(httpStatus.NO_CONTENT).send();
});

export default { getTestcases, getTestcase, updateTestcase, deleteTestcase }
