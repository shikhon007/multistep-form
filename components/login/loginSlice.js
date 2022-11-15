import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    username: "",
    password: "",
    errors: {},
  },
  reducers: {
    setLogin: (state, action) => {
      const { inputName } = action.payload;
      state[inputName] = action.payload[inputName];
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
  },
});
export const { setLogin, setErrors } = loginSlice.actions;
export default loginSlice.reducer;
