import Joi from "joi-browser";
import { useState } from "react";
import useForm from "../form/useForm";
import Input from "../input/Input";
const FirstStep = ({ nextStep, setRegistration, registration }) => {
  // schema for validation
  const schema = {
    firstName: Joi.string().min(4).max(20).required().label("FirstName"),
    lastName: Joi.string().min(4).max(20).required().label("LastName"),
  };

  // validation data
  const checkSchema = {
    firstName: registration.firstName,
    lastName: registration.lastName,
  };

  // handle Error
  const [errors, setErrors] = useState({});

  const doSubmit = () => {
    nextStep();
  }

  const { handleChange, handleSubmit } = useForm(schema, checkSchema, registration, setRegistration, errors, setErrors, doSubmit)
  // const validateLogin = () => {
  //   const { error } = Joi.validate(signUp, schema, { abortEarly: false });
  //   if (!error) return null;

  //   const dataError = {};
  //   for (let item of error.details) dataError[item.path[0]] = item.message;

  //   return dataError;
  // };

  // const validateProperty = ({ name, value }) => {
  //   //const { name, value } = event.target;
  //   const obj = { [name]: value };
  //   const subSchema = { [name]: schema[name] };
  //   const { error } = Joi.validate(obj, subSchema);
  //   return error ? error.details[0].message : null;
  // };

  // const handleChange = ({ target: input }) => {
  //   //const { name, value } = event.target;
  //   let errorData = { ...errors };
  //   const errorMessage = validateProperty(input);
  //   if (errorMessage) {
  //     errorData[input.name] = errorMessage;
  //   } else {
  //     delete errorData[input.name];
  //   }
  //   let Data = { ...registration };
  //   Data[input.name] = input.value;
  //   setRegistration(Data);
  //   setErrors(errorData);
  //   // setRegistation({ ...signUp, [input.name]: input.value });
  //   // setErrors({ ...errors, errors });
  // };

  // const handleNext = () => {
  //   const errors = validateLogin();
  //   setErrors({ ...errors, errors: errors || {} });
  //   if (errors) return;

  //   console.log("data is working");
  //   nextStep();
  // };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h3 className="text-2xl mb-5 text-sky-500">Registration Form</h3>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col items-center justify-center shadow-md shadow-slate-300 w-[400px] h-[450px] border-t-4 border-sky-300"
      >
        <Input
          type="text"
          onChange={handleChange}
          value={registration.firstName}
          placeholder="enter your firstname"
          name="firstName"
          label="Firstname"
          error={errors.firstName}
        />
        <Input
          type="text"
          onChange={handleChange}
          value={registration.lastName}
          placeholder="enter your Lastname"
          name="lastName"
          label="Lastname"
          error={errors.lastName}
        />

        <div className="space-x-4 mt-4">
          <button
            disabled
            className="w-[100px] bg-sky-300 text-white capitalize p-1 rounded-md hover:bg-white-500"
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

export default FirstStep;
