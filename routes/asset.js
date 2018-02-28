var express = require('express');
var router = express.Router();

var AssetController = require('../controllers/AssetController');

router.get('/info', AssetController.info);

router.get('/update', AssetController.update);

router.get('/transfer', AssetController.transfer);

router.get('/publish', AssetController.publish);

module.exports = router;
