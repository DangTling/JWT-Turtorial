import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: {
      allUsers: null,
      isFetching: false,
      error: false,
    },
    msg: "",
  },
  reducers: {
    getAllUsersStart: (state) => {
      state.users.isFetching = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.users.isFetching = false;
      state.users.allUsers = action.payload;
    },
    getAllUsersFail: (state) => {
      state.users.error = true;
      state.users.isFetching = false;
    },
    deleteUserStart: (state) => {
      state.users.isFetching = true;
    },
    deleteUserSuccess: (state, action) => {
      state.users.isFetching = false;
      state.msg = action.payload;
    },
    deleteUserFail: (state, action) => {
      state.users.error = true;
      state.users.isFetching = false;
      state.msg = action.payload;
    },
  },
});

export const {
  getAllUsersFail,
  getAllUsersStart,
  getAllUsersSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFail,
} = userSlice.actions;
export default userSlice.reducer;
