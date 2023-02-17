const express = require('express');
const router = express.Router();

const loginedController = require('../app/controllers/LoginedController');

router.get('/', loginedController.logined);




module.exports = router;