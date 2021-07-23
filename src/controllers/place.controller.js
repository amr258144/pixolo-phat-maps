const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { placeService } = require('../services');

const copyPlace = catchAsync(async (req, res) => {
  const updatePlace = await placeService.copyPlaceToMap(req.params.mapId, req.body.places);
  if (!updatePlace) {
    // throw new ApiError(httpStatus.NOT_FOUND, 'Map not found');
    res.send({'code': 400, 'message': 'Something Went Wrong', 'data': false});
  }
  res.send({'code': 201, 'message': 'Place copied', 'data': true});
});


const searchUserOrPlace = catchAsync(async (req, res) => {
  let data;
  if(req.query.search_type === 'user') {
    data = await placeService.searchByUser(req.query.input);
  } else {
    data = await placeService.searchByPlace(req.query.input);
  }
  if (!data) {
    // throw new ApiError(httpStatus.NOT_FOUND, 'Map not found');
    res.send({'code': 400, 'message': 'Something Went Wrong', 'data': false});
  }
  res.send({'code': 200, 'message': 'Search results', 'data': data});
});

module.exports = {
  copyPlace,
  searchUserOrPlace,
};