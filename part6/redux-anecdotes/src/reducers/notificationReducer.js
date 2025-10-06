import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "You are now viewing anecdotes.",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    }
  }
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
