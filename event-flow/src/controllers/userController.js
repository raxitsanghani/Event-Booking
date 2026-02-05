const asyncHandler = require('express-async-handler');
const userService = require('../services/userService');

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const register = asyncHandler(async (req, res) => {
    const user = await userService.registerUser(req.body);
    res.status(201).json({
        success: true,
        data: user
    });
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);
    res.status(200).json({
        success: true,
        data: user
    });
});

module.exports = {
    register,
    login
};
