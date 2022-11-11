import { createSlice } from "@reduxjs/toolkit";

const registrationSlice = createSlice({
    name: "signup",
    initialState: {
        step: 1,
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        address: "",
        password: "",
        confirmPassword: "",
    },
    reducers: {
        handleNextStep: (state) => {
            state.step = state.step + 1;
        },
        handlePrevStep: (state) => {
            state.step = state.step - 1;
        },
        setRegistration: (state, action) => {
            state = action.payload
        }
    }

});
export const { handleNextStep, handlePrevStep, setRegistration } = registrationSlice.actions;
export default registrationSlice.reducer;