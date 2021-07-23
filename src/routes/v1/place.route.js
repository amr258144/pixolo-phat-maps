const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
// const mapValidation = require('../../validations/map.validation');
const placeController = require('../../controllers/place.controller');

const router = express.Router();

// router
//   .route('/:mapId')
//   .get(auth('getMaps'), validate(mapValidation.getMap), mapController.getMap);

// router.get('/:mapId', validate(mapValidation.getMap), mapController.getMap);

router.post('/copy/:mapId', placeController.copyPlace);
router.get('/search/all', placeController.searchUserOrPlace);

module.exports = router;