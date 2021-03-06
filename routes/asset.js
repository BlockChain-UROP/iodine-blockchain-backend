var express = require('express');
var router = express.Router();

var AssetController = require('../controllers/AssetController');

// Get ID, Address and Seed
router.get('/info/:id', AssetController.info);

router.get('/test', AssetController.test);

router.post('/update', AssetController.update)

router.post('/transfer', AssetController.transfer);

router.post('/publish', AssetController.publish);

// TODO:
// /remove and /updateAvail

module.exports = router;
