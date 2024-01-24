import axios from "axios";
// export const baseUrl = "http://localhost:4000";
//
//
// Find user with username ---***
export const registerUser = async (user: object) => {
  try {
    const res = await axios.post(`/api/user/register`, user);
    return res;
  } catch (error) {
    return (error as any)?.response;
  }
};
//
//
// Find user with username ---***
export const isUserExist = async (username: string) => {
  try {
    const res = await axios.post(`/api/user/verify-username`, {
      username,
    });
    return res;
  } catch (error) {
    return (error as any)?.response;
  }
};
//
//
// Find user with username ---***
export const loginUser = async (username: string, password: string) => {
  try {
    const res = await axios.post(`/api/user/login`, {
      username,
      password,
    });
    return res;
  } catch (error) {
    return (error as any)?.response;
  }
};
//
//
// Find user with username ---***
export const updateUser = async (user: object, userId: string) => {
  try {
    const res = await axios.put(`/api/user/update-user/${userId}`, user);
    return res;
  } catch (error) {
    return (error as any)?.response;
  }
};
//
//
// Find user with username ---***
export const recoverPassword = async (username: string) => {
  try {
    const res = await axios.post(`/api/user/forget-password`, { username });
    return res;
  } catch (error) {
    return (error as any)?.response;
  }
};
//
//
// Find user with username ---***
export const isValidOtp = async (otp: object) => {
  try {
    const res = await axios.post(`/api/user/verify-token`, otp);
    return res;
  } catch (error) {
    return (error as any)?.response;
  }
};
//
//
// Find user with username ---***
export const resetPassword = async (resetPwd: object) => {
  try {
    const res = await axios.put(`/api/user/reset-password`, resetPwd);
    return res;
  } catch (error) {
    return (error as any)?.response;
  }
};
//
//
// Find user with username ---***
export const logoutUser = async () => {
  try {
    const res = await axios.get(`/api/user/logout`);
    return res;
  } catch (error) {
    return (error as any)?.response;
  }
};
