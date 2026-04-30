// ai.controller.js
const aiService = require('./ai.service');
const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../utils/asyncHandler');

const summarize = asyncHandler(async (req, res) => {
  const result = await aiService.summarizeResume(req.body.resumeId, req.user.user_id);
  return ApiResponse.success(res, result, 'Summary generated');
});

const improveSkills = asyncHandler(async (req, res) => {
  const result = await aiService.improveSkills(req.body.resumeId, req.user.user_id);
  return ApiResponse.success(res, result, 'Skill improvements generated');
});

const scoreResume = asyncHandler(async (req, res) => {
  const result = await aiService.scoreResume(req.body.resumeId, req.user.user_id);
  return ApiResponse.success(res, result, 'Resume scored');
});

module.exports = { summarize, improveSkills, scoreResume };
