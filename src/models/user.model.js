const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    instagram_url: {
      type: String
    },
    dob: Date,
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    mobile: {
      type: String,
      minlength: 10,
      required: true,
    },
    profile_photo: String,
    login_type: Number,
    gmail: {
      type: String,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    google_access_token: String,
    google_id: String,
    google_id_token: String,
    device_id: [String],
    favorite_lists: [{
      _id: mongoose.Schema.Types.ObjectId,
      name: {
        type: String,
        trim: true
      },
      maps: [String],
      created_date: {
        type: Date,
        default: Date.now
      }
    }],
    follower_count: Number,
    following_count: Number,
    followers: [{
      _id: false,
      user_id: mongoose.Schema.Types.ObjectId,
      name: String
    }],
    following: [{
      _id: false,
      user_id: mongoose.Schema.Types.ObjectId,
      name: String
    }],
    maps_created: Date,
    created_date: Date,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
/*userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};*/

/*userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});*/

/**
 * @typedef User
 */
const User = mongoose.model('users', userSchema);

mongoose.set('useFindAndModify', false);
mongoose.set('debug', true);

module.exports = User;
