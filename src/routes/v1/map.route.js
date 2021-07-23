const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const mapValidation = require('../../validations/map.validation');
const mapController = require('../../controllers/maps.controller');

const router = express.Router();

// router
//   .route('/:mapId')
//   .get(auth('getMaps'), validate(mapValidation.getMap), mapController.getMap);

// router.get('/:mapId', validate(mapValidation.getMap), mapController.getMap);

router.get('/:mapId', mapController.getMap);
router.get('/view/:mapId', mapController.viewMap);
router.get('/explore/all', mapController.exploreMaps);

module.exports = router;