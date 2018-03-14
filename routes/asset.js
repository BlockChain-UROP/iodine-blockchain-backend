var express = require('express');
var router = express.Router();

var AssetController = require('../controllers/AssetController');

// Get ID, Address and Seed
router.get('/info/:id', AssetController.info);

router.get('/test', AssetController.test);

router.post('/update', AssetController.update)

router.post('/transfer', AssetController.transfer);

router.get('/publish', AssetController.publish);

module.exports = router;
