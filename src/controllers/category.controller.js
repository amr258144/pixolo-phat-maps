const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');

const listCategories = catchAsync(async (req, res) => {
  const categories = await categoryService.getCategories();
  if (!categories) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Categories not found');
  }
  res.send({'code': 200, 'message': 'Categories', 'data': categories});
});

module.exports = {
  listCategories,
};