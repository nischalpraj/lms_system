/**
 * Parses and sanitizes pagination parameters from query string.
 * @param {object} query - Express req.query
 * @returns {{ skip: number, take: number, page: number, limit: number }}
 */
const getPagination = (query) => {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 10));
  const skip = (page - 1) * limit;
  return { skip, take: limit, page, limit };
};

/**
 * Builds a pagination meta object for list responses.
 * @param {number} total - total record count
 * @param {number} page
 * @param {number} limit
 * @returns {{ page, limit, total, totalPages }}
 */
const buildMeta = (total, page, limit) => ({
  page,
  limit,
  total,
  totalPages: Math.ceil(total / limit),
});

module.exports = { getPagination, buildMeta };
