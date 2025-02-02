const response = (response, status, data, message) => {
  response.status(status).json({
    statusCode: status,
    data: data,
    message: message,
  });
};
module.exports = response