const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// Route để đăng ký người dùng
router.post('/register', registerUser);

// Route để đăng nhập người dùng
router.post('/login', loginUser);

module.exports = router;
