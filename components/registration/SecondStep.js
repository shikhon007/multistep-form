import Joi from "joi-browser";
import Input from "../input/Input";
import useForm from "./../form/useForm";
import { useDispatch, useSelector } from "react-redux";
import {
  handleNextStep,
  handlePrevStep,
  setErrors,
  setRegistration,
} from "./registrationSlice";

const SecondStep = () => {
  const registration = useSelector((state) => state.registration);
  const { errors, mobile, email } = registration;
  const dispatch = useDispatch();

  const schema = {
    mobile: Joi.string().min(11).max(11).required().label("Mobile"),
    email: Joi.string().required().label("email"),
  };

  const checkSchema = {
    mobile: mobile,
    email: email,
  };

  const setRegistrationData = (data, inputName) => {
    let newData = { ...data, inputName };
    dispatch(setRegistration(newData));
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
          type="text"
          onChange={handleChange}
          value={mobile}
          placeholder="enter your mobile"
          name="mobile"
          label="Mobile"
          error={errors.mobile}
        />
        <Input
          type="email"
          onChange={handleChange}
          value={email}
          placeholder="enter your email"
          name="email"
          label="email"
          error={errors.email}
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

export default SecondStep;
