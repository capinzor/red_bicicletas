var express = require('express');
var router = express.Router();
var bicycleController = require('../../controllers/api/bicycleControllerAPI');

router.get('/', bicycleController.bicycle_list);
//router.get('/create', bicycleController.bicycle_create_get);
router.post('/create', bicycleController.bicycle_create);
//router.get('/:id/update', bicycleController.bicycle_update_get);
//router.post('/:id/update', bicycleController.bicycle_update_post);
router.post('/delete', bicycleController.bicycle_delete);

module.exports = router;  