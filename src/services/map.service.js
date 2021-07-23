const httpStatus = require('http-status');
const { Maps } = require('../models');
const ApiError = require('../utils/ApiError');
const config = require('./../config/config');
const axios = require('axios');

const getMapById = async (id) => {
  return Maps.findById(id);
};

const isFavouriteByMe = async (map_id, user_id) => {
	return Maps.findOne({_id: map_id, 'favorited_by.user_id': user_id});
};

const viewMapByUserId = async (map_id, user_id) => {
  return Maps.update({_id :map_id}, { $push: {'viewed_by': {'user_id': user_id, 'datetime': new Date()}}, $inc : {'view_count' : 1}});
};

const viewMapById = async (map_id) => {
  return Maps.update({_id :map_id}, { $inc : {'view_count' : 1}});
};

const searchMaps = async (address, sort_by, start = 0, count = 10, category = 0, sub_category = [], user_id = 0) => {
	let whereCond = {'places.address_components': address};
	if(category) {
		whereCond['places.category'] = category;
	}
	if(sub_category.length > 0) {
		whereCond['places.subCategory'] = { $all: sub_category };
	}
	if(sort_by == 'favorites') {
		return Maps.find(whereCond).sort({'favorite_count': -1}).skip(parseInt(start)).limit(parseInt(count));
	} else {
		return Maps.find(whereCond).sort({'created_at': -1, 'edited_at': -1}).skip(parseInt(start)).limit(parseInt(count));
	}
	// return Maps.find(whereCond);
}

module.exports = {
  getMapById,
  viewMapByUserId,
  viewMapById,
  isFavouriteByMe,
  searchMaps,
};