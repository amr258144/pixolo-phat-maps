const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { mapService } = require('../services');

const getMap = catchAsync(async (req, res) => {
  const map = await mapService.getMapById(req.params.mapId);
  if (!map) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Map not found');
  }
  let is_fav = 0;
  if(req.query.userId) {
    favorite = await mapService.isFavouriteByMe(req.params.mapId, req.query.userId)
    if(favorite) {
      is_fav = 1;
    }
  }
  res.send({'code': 200, 'message': 'Map Details', 'data': map, 'is_fav_by_me': is_fav});
});


const viewMap = catchAsync(async (req, res) => {
  let map;
  if(req.query.userId) {
    map = await mapService.viewMapByUserId(req.params.mapId, req.query.userId);
  } else {
    map = await mapService.viewMapById(req.params.mapId);
  }
  if (!map) {
    // throw new ApiError(httpStatus.NOT_FOUND, 'Map not found');
    res.send({'code': 400, 'message': 'Something Went Wrong', 'data': false});
  }
  res.send({'code': 200, 'message': 'Map Viewed', 'data': true});
});


const exploreMaps = catchAsync(async (req, res) => {
  let maps = await mapService.searchMaps(req.query.address, req.query.sort_by, req.query.start, req.query.count, req.query.category, req.query.sub_category, req.query.user_id);
  if (!maps) {
    // throw new ApiError(httpStatus.NOT_FOUND, 'Map not found');
    res.send({'code': 400, 'message': 'Something Went Wrong', 'data': false});
  }
  let result = [];
  maps.forEach(async function(map, i) {
    let fav = {};
    fav['is_fav_by_me'] = 0;
    ind = map.favorited_by.findIndex(x => x.user_id == req.query.user_id)
    if(ind !== -1) {
      fav['is_fav_by_me'] = 1;
    }
    result.push({map, fav});
  })
  res.send({'code': 200, 'message': 'Map results', 'data': result});
});


module.exports = {
  getMap,
  viewMap,
  exploreMaps,
};