// export.controller.js
const exportService = require('./export.service');
const asyncHandler = require('../../utils/asyncHandler');

const exportPdf = asyncHandler(async (req, res) => {
  const isAdmin = req.user.role === 'admin';
  await exportService.exportPdf(req.params.id, req.user.user_id, isAdmin, res);
  // Response is streamed — no ApiResponse wrapper needed
});

module.exports = { exportPdf };
