import Joi from "joi-browser";
import Input from "../input/Input";
import useForm from './../form/useForm';
import { useState } from 'react';

const SecondStep = ({ nextStep, prevStep, setRegistration, registration }) => {


  const schema = {
    mobile: Joi.string().min(11).max(11).required().label("Mobile"),
    email: Joi.string().required().label("email")
  }
  const [errors, setErrors] = useState({});

  const checkSchema = {
    mobile: registration.mobile,
    email: registration.email
  }


  const handlePrevStep = () => {
    prevStep();
  };

  const doSubmit = () => {
    nextStep();
  };

  const { handleChange, handleSubmit } = useForm(schema, checkSchema, registration, setRegistration, errors, setErrors, doSubmit)

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
          value={registration.mobile}
          placeholder="enter your mobile"
          name="mobile"
          label="Mobile"
          error={errors.mobile}
        />
        <Input
          type="email"
          onChange={handleChange}
          value={registration.email}
          placeholder="enter your email"
          name="email"
          label="email"
          error={errors.email}
        />

        <div className="space-x-4 mt-4">
          <button
            onClick={handlePrevStep}
            className="w-[100px] bg-sky-300 text-white capitalize p-1 rounded-md hover:bg-sky-500"
          >
            prev
          </button>
          <button onClick={handleSubmit} className="w-[100px] bg-sky-300 text-white capitalize p-1 rounded-md hover:bg-sky-500">
            next
          </button>
        </div>
      </form>
    </div>
  );
};

export default SecondStep;
