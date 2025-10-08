import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "You are now viewing anecdotes.",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return null;
    },
  }
});

export const { setNotification, removeNotification } = notificationSlice.actions;

export const createNotification = (notification, expirySeconds) => {
  return async (dispatch) => {
    dispatch(setNotification(notification));
    setTimeout(() => {
      dispatch(removeNotification());
    }, expirySeconds * 1000);
  };
};

export default notificationSlice.reducer;
