import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFail,
  registerStart,
  registerSuccess,
  registerFail,
  logoutStart,
  logoutSuccess,
  logoutFail,
} from "./authSlice";
import {
  deleteUserFail,
  deleteUserStart,
  deleteUserSuccess,
  getAllUsersFail,
  getAllUsersStart,
  getAllUsersSuccess,
} from "./userSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/v1/auth/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (error) {
    dispatch(loginFail());
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post("/v1/auth/register", user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (error) {
    dispatch(registerFail());
  }
};

export const getAllUsers = async (accessToken, dispatch, JWTaxios) => {
  dispatch(getAllUsersStart());
  try {
    const res = await JWTaxios.get("/v1/user", {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getAllUsersSuccess(res.data));
  } catch (error) {
    dispatch(getAllUsersFail());
  }
};

export const deleteUser = async (accessToken, dispatch, id, JWTaxios) => {
  dispatch(deleteUserStart());
  try {
    const res = await JWTaxios.delete("/v1/user/delete/" + id, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(deleteUserSuccess(res.data));
  } catch (error) {
    dispatch(deleteUserFail(error.response.data));
  }
};

export const logoutUser = async (accessToken, dispatch, id, JWTaxios) => {
  dispatch(logoutStart());
  try {
    const res = await JWTaxios.post("/v1/auth/logout", id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFail());
  }
};
