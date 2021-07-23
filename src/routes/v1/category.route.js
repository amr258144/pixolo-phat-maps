const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const categoryController = require('../../controllers/category.controller');

const router = express.Router();

router.get('/', categoryController.listCategories);

module.exports = router;