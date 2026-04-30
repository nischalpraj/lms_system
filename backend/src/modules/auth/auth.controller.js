const authService = require('./auth.service');
const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../utils/asyncHandler');

const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);
  return ApiResponse.created(res, result, 'Account created successfully');
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
  return ApiResponse.success(res, result, 'Login successful');
});

const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  const result = await authService.refresh(refreshToken);
  return ApiResponse.success(res, result, 'Token refreshed');
});

const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  await authService.logout(refreshToken);
  return ApiResponse.noContent(res);
});

module.exports = { register, login, refresh, logout };
