//
// HTTP client success controller ---***
const successResponse = (
  res,
  { statusCode = 200, message = "Success", payload }
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    payload,
  });
};
//
// HTTP client success controller ---***
const errorResponse = (
  res,
  { statusCode = 500, message = "Server error || Somthing is broke" }
) => {
  return res.status(statusCode).json({ success: false, message });
};
//
//
// Export module ---***
module.exports = {
  successResponse,
  errorResponse,
};
