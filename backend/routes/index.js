const router = require('express').Router();
const userController = require('../controllers/user');
const alarmController = require('../controllers/alarm');

router.post('/signup', userController.handleSignup);
router.post('/signin', userController.handleSignin);

module.exports = router;