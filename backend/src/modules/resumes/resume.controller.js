const resumeService = require('./resume.service');
const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../utils/asyncHandler');

const listResumes = asyncHandler(async (req, res) => {
  const { resumes, meta } = await resumeService.listResumes(req.user.user_id, req.query);
  return ApiResponse.paginated(res, resumes, meta, 'Resumes retrieved');
});

const getResume = asyncHandler(async (req, res) => {
  const isAdmin = req.user.role === 'admin';
  const resume = await resumeService.getResumeById(req.params.id, req.user.user_id, isAdmin);
  return ApiResponse.success(res, resume, 'Resume retrieved');
});

const getPublicResume = asyncHandler(async (req, res) => {
  const resume = await resumeService.getPublicResume(req.params.shareToken);
  return ApiResponse.success(res, resume, 'Resume retrieved');
});

const createResume = asyncHandler(async (req, res) => {
  const resume = await resumeService.createResume(req.user.user_id, req.body);
  return ApiResponse.created(res, resume, 'Resume created');
});

const updateResume = asyncHandler(async (req, res) => {
  const isAdmin = req.user.role === 'admin';
  const resume = await resumeService.updateResume(req.params.id, req.user.user_id, req.body, isAdmin);
  return ApiResponse.success(res, resume, 'Resume updated');
});

const deleteResume = asyncHandler(async (req, res) => {
  const isAdmin = req.user.role === 'admin';
  await resumeService.deleteResume(req.params.id, req.user.user_id, isAdmin);
  return ApiResponse.noContent(res);
});

const addSection = asyncHandler(async (req, res) => {
  const isAdmin = req.user.role === 'admin';
  const section = await resumeService.addSection(req.params.id, req.user.user_id, req.body, isAdmin);
  return ApiResponse.created(res, section, 'Section added');
});

const updateSection = asyncHandler(async (req, res) => {
  const isAdmin = req.user.role === 'admin';
  const section = await resumeService.updateSection(
    req.params.id,
    req.params.sectionId,
    req.user.user_id,
    req.body,
    isAdmin
  );
  return ApiResponse.success(res, section, 'Section updated');
});

const deleteSection = asyncHandler(async (req, res) => {
  const { type } = req.query;
  const isAdmin = req.user.role === 'admin';
  await resumeService.deleteSection(req.params.id, req.params.sectionId, req.user.user_id, type, isAdmin);
  return ApiResponse.noContent(res);
});

const getShareLink = asyncHandler(async (req, res) => {
  const result = await resumeService.generateShareLink(req.params.id, req.user.user_id);
  return ApiResponse.success(res, result, 'Share link generated');
});

module.exports = {
  listResumes,
  getResume,
  getPublicResume,
  createResume,
  updateResume,
  deleteResume,
  addSection,
  updateSection,
  deleteSection,
  getShareLink,
};
