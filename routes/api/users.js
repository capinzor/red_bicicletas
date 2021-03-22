var express = require('express');
var router = express.Router();
var userController = require('../../controllers/api/userControllerAPI');

router.get('/', userController.users_list);
router.post('/create', userController.users_create);
router.post('/reserve', userController.user_reserve);

module.exports = router;