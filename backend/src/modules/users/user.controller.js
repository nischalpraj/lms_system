const userService = require('./user.service');
const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../utils/asyncHandler');

const getMe = asyncHandler(async (req, res) => {
  const user = await userService.getMe(req.user.user_id);
  return ApiResponse.success(res, user, 'Profile retrieved');
});

const updateMe = asyncHandler(async (req, res) => {
  const user = await userService.updateMe(req.user.user_id, req.body);
  return ApiResponse.success(res, user, 'Profile updated');
});

const listUsers = asyncHandler(async (req, res) => {
  const { users, meta } = await userService.listUsers(req.query);
  return ApiResponse.paginated(res, users, meta, 'Users retrieved');
});

module.exports = { getMe, updateMe, listUsers };
