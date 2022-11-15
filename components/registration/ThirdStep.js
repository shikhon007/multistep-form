import Joi from "joi-browser";
import useForm from "../form/useForm";
import Input from "../input/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  handleNextStep,
  handlePrevStep,
  setErrors,
  setRegistration,
} from "./registrationSlice";

const ThirdStep = () => {
  const registration = useSelector((state) => state.registration);
  const { errors, password, confirmPassword } = registration;
  const dispatch = useDispatch();

  const schema = {
    password: Joi.string().min(8).max(20).required().label("Password"),
    confirmPassword: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .error(() => {
        return {
          message: "Confirm password dose not match with the Password",
        };
      }),
  };

  const checkSchema = {
    password: password,
    confirmPassword: confirmPassword,
  };

  const setRegistrationData = (data, inputName) => {
    let newdata = { ...data, inputName };
    dispatch(setRegistration(newdata));
  };

  const setErrorsData = (error) => {
    dispatch(setErrors(error));
  };

  const doSubmit = () => {
    dispatch(handleNextStep());
  };

  const { handleChange, handleSubmit } = useForm(
    schema,
    checkSchema,
    registration,
    setRegistrationData,
    errors,
    setErrorsData,
    doSubmit
  );

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h3 className="text-2xl mb-5 text-sky-300">Registration Form</h3>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col items-center justify-center shadow-md shadow-slate-300 w-[400px] h-[450px] border-t-8 border-sky-200"
      >
        <Input
          type="password"
          onChange={handleChange}
          value={password}
          placeholder="enter your password"
          name="password"
          label="Password"
          error={errors.password}
        />
        <Input
          type="password"
          onChange={handleChange}
          value={confirmPassword}
          placeholder="confirm your password"
          name="confirmPassword"
          label="confirm Password"
          error={errors.confirmPassword}
        />

        <div className="space-x-4 mt-4">
          <button
            onClick={() => dispatch(handlePrevStep())}
            className="w-[100px] bg-sky-300 text-white capitalize p-1 rounded-md hover:bg-sky-500"
          >
            prev
          </button>
          <button
            onClick={handleSubmit}
            className="w-[100px] bg-sky-300 text-white capitalize p-1 rounded-md hover:bg-sky-500"
          >
            next
          </button>
        </div>
      </form>
    </div>
  );
};

export default ThirdStep;
