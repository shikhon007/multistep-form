import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../components/login/loginSlice";
import registrationReducer from "../components/registration/registrationSlice";

const store = configureStore({
  reducer: {
    registration: registrationReducer,
    login: loginReducer,
  },
});

export default store;
