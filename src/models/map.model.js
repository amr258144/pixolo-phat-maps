const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const mapSchema = mongoose.Schema(
  {
  	_id: mongoose.Schema.Types.ObjectId,
    title: {
      type: String,
      required: true,
      trim: true,
    },
    short_description: {
      type: String,
      required: true,
    },
    long_description: {
      type: String,
      required: true,
    },
    places: [{
      _id: false,
    	place_id: mongoose.Schema.Types.ObjectId,
    	title: String,
      description: String,
    	location: [],
    	address_components: [],
    	category: Number,
    	subCategory: [Number],
      is_custom: Number
    }],
    favorited_by: [{
      _id: false,
    	user_id: mongoose.Schema.Types.ObjectId,
    	datetime: Date
    }],
    viewed_by: [{
      _id: false,
      user_id: mongoose.Schema.Types.ObjectId,
      datetime: Date
    }],
    user: {
      _id: false,
      user_id: mongoose.Schema.Types.ObjectId,
      name: String,
      profile_photo: String
    },
    view_count: Number,
    favorite_count: Number,
    created_at: Date,
    edited_at: Date,
  },
);

mapSchema.plugin(toJSON);
mapSchema.plugin(paginate);

const Maps = mongoose.model('maps', mapSchema);

mongoose.set('useFindAndModify', false);
mongoose.set('debug', true);

module.exports = Maps;