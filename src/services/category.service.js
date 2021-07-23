const httpStatus = require('http-status');
const { Category } = require('../models');
const ApiError = require('../utils/ApiError');

const getCategories = async () => {
	return Category.find();
};

const insertInToCategories = async () => {
	let category = {
		name: 'Shopping',
		color: 'green'
	}
	// return Category.update({_id :'60ef1d041579d65e8209c570'}, { $push: {'sub_categories': [{name: 'Vegan'}, {name: 'Local'}, {name: 'Desert'}, {name: 'Brunch'}, {name: 'Dinner'}, {name: 'Cafe'}]}});
	// return Category.update({_id :'60ef1d5e194f935f0805c1ea'}, { $push: {'sub_categories': [{name: 'Party Wear'}, {name: 'Formals'}, {name: 'Casuals'}]}});
	// return Category.insertMany(category);
}

module.exports = {
  getCategories,
  insertInToCategories,
};
