import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "",
  isUnderLine: false,
  isBold: false,
  isItaly: false,
  size: "",
  color: "",
};
const customSlice = createSlice({
  name: "custom",
  initialState,
  reducers: {
    setCustom: (state, action) => {
      state.text = action.payload.accessToken;
      state.size = action.payload.id;
      state.color = action.payload.user;
      state.isUnderLine = action.payload.user;
      state.isBold = action.payload.user;
      state.isItaly = action.payload.user;
    },
  },
});
export const { setCustom } = customSlice.actions;

export default customSlice.reducer;