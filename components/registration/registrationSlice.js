import { createSlice } from "@reduxjs/toolkit";

const registrationSlice = createSlice({
  name: "signup",
  initialState: {
    step: 1,
    username: "",
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: { username: "" },
  },
  reducers: {
    handleNextStep: (state) => {
      state.step = state.step + 1;
    },
    handlePrevStep: (state) => {
      state.step = state.step - 1;
    },
    setRegistration: (state, action) => {
      const { inputName } = action.payload;
      state[inputName] = action.payload[inputName];
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
  },
});
export const { handleNextStep, handlePrevStep, setRegistration, setErrors } =
  registrationSlice.actions;
export default registrationSlice.reducer;
