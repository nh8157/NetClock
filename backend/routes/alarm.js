const router = require('express').Router();
const alarmController = require('../controllers/alarm');

router.post('/add-alarm', alarmController.handleAddAlarm);
router.post('/rmv-alarm', alarmController.handleRmvAlarm);
router.get('/get-alarm', alarmController.handleGetAlarm)
router.post('/update-alarm', alarmController.handleUpdateAlarm);

module.exports = router;