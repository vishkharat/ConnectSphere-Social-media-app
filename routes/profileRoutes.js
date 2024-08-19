const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:userId', getProfile);
router.put('/:userId', authMiddleware, updateProfile);

module.exports = router;
