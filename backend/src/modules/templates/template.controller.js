const templateService = require('./template.service');
const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../utils/asyncHandler');

const listTemplates = asyncHandler(async (req, res) => {
  const { templates, meta } = await templateService.listTemplates(req.query);
  return ApiResponse.paginated(res, templates, meta, 'Templates retrieved');
});

const getTemplate = asyncHandler(async (req, res) => {
  const template = await templateService.getTemplateById(req.params.id);
  return ApiResponse.success(res, template, 'Template retrieved');
});

const createTemplate = asyncHandler(async (req, res) => {
  const template = await templateService.createTemplate(req.body);
  return ApiResponse.created(res, template, 'Template created');
});

const updateTemplate = asyncHandler(async (req, res) => {
  const template = await templateService.updateTemplate(req.params.id, req.body);
  return ApiResponse.success(res, template, 'Template updated');
});

const deleteTemplate = asyncHandler(async (req, res) => {
  await templateService.deleteTemplate(req.params.id);
  return ApiResponse.noContent(res);
});

module.exports = { listTemplates, getTemplate, createTemplate, updateTemplate, deleteTemplate };
