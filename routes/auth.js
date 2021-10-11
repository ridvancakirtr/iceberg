const express = require('express')
const router = express.Router();

const { login, logout, getMe, updatePassword, updateDetails } = require('../controllers/auth')
const { protect } = require('../middleware/auth')

router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/me').get(protect, getMe);
router.route('/updatedetails').put(protect, updateDetails);
router.route('/updatepassword').put(protect, updatePassword);
module.exports = router;