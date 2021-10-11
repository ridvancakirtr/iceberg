const express = require('express');
const router = express.Router({ mergeParams: true });

const { getUsers, getUser, updateUser, createUser, deleteUser } = require('../controllers/users');
const { protect } = require('../middleware/auth')

router.route('/').get(protect, getUsers);
router.route('/:id').get(protect, getUser);
router.route('/').post(createUser);
router.route('/:id').put(protect, updateUser);
router.route('/:id').delete(protect, deleteUser);

module.exports = router;