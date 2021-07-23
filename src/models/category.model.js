const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const categorySchema = mongoose.Schema(
  {
  	_id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
      trim: true,
    },
    color: String,
    sub_categories: [{
    	name: String
    }]
  },
);

categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

const Category = mongoose.model('category', categorySchema);

mongoose.set('useFindAndModify', false);
mongoose.set('debug', true);

module.exports = Category;