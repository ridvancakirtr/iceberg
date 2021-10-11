const express = require('express');
const router = express.Router({ mergeParams: true });

const {
    getAppointments,
    createAppointment,
    getAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentUser
} = require('../controllers/appointments');

const { protect } = require('../middleware/auth')

router.route('/').get(protect, getAppointments);
router.route('/:id').get(protect, getAppointment);
router.route('/').post(protect, createAppointment);
router.route('/:id').put(protect, updateAppointment);
router.route('/:id').delete(protect, deleteAppointment);

router.route('/:userId/user').get(protect, getAppointmentUser);

module.exports = router;