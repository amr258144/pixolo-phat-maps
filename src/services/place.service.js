const httpStatus = require('http-status');
const { Maps, User } = require('../models');
const ApiError = require('../utils/ApiError');
const config = require('./../config/config');
const axios = require('axios');

const copyPlaceToMap = async (map_id, places) => {
	places.forEach(async function(place) {
		/*let objid = require('mongoose').Types.ObjectId();
		console.log(objid)*/
		await Maps.updateMany({_id :map_id}, { $push: { 'places' : place }});
	})
	return true;
};

const searchByUser = async (input) => {
	return User.find({ $or: [{ 'username' : { $regex: '.*'+input+'.*', $options:'i' } }, {'first_name': { $regex: '.*'+input+'.*', $options:'i' }}, {'last_name': { $regex: '.*'+input+'.*', $options:'i' }}]});
};

const searchByPlace = async (input) => {
	try {
		const response = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?key='+config.gapi_key+'&language=en&input='+input);
		return response.data.predictions;
	} catch(error) {
		return error.response.body;
	}
};


module.exports = {
  copyPlaceToMap,
  searchByUser,
  searchByPlace,
};