var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users');

router.get('/', usersController.list);
router.get('/create', usersController.create_get);
router.post('/create', usersController.create);
router.get('/:id/update', usersController.update_get);
router.post('/:id/update', usersController.update);
router.post('/:id/delete', usersController.delete);

module.exports = router;