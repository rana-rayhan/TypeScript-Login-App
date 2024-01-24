//
//
// Helper for setup access token as cookie ---***
const setAccessCookie = (res, token) => {
  res.cookie("accessToken", token, {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    //   secure: true, // for production
    // sameSite: "none", // for production
  });
};
//
//
// Exports module
module.exports = {
  setAccessCookie,
};
