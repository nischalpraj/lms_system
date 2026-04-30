class ApiResponse {
  static success(res, data, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static created(res, data, message = 'Created successfully') {
    return ApiResponse.success(res, data, message, 201);
  }

  static noContent(res) {
    return res.status(204).send();
  }

  static paginated(res, data, meta, message = 'Success') {
    return res.status(200).json({
      success: true,
      message,
      data,
      meta,
    });
  }

  static error(res, statusCode, message, details = []) {
    const body = {
      success: false,
      error: message,
      code: statusCode,
    };
    if (details && details.length > 0) {
      body.details = details;
    }
    return res.status(statusCode).json(body);
  }
}

module.exports = ApiResponse;
