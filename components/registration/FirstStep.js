import { useState, useEffect } from "react";
import Joi from "joi-browser";
import useSWR from "swr";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../form/useForm";
import Input from "../input/Input";
import {
  handleNextStep,
  setErrors,
  setRegistration,
} from "./registrationSlice";

// fetcher method
const fetcher = (url) => axios.get(url).then((res) => res.data);

const FirstStep = () => {
  // using redux toolkit
  const registration = useSelector((state) => state.registration);
  const { errors, username, firstName, lastName } = registration;
  const dispatch = useDispatch();

  // schema for validation
  const schema = {
    username: Joi.string().min(4).max(20).required().label("Username"),
    firstName: Joi.string().min(4).max(20).required().label("FirstName"),
    lastName: Joi.string().min(4).max(20).required().label("LastName"),
  };

  // validation data
  const checkSchema = {
    username: username,
    firstName: firstName,
    lastName: lastName,
  };

  // set onchange data
  const setRegistrationData = (data, inputName) => {
    let newdata = { ...data, inputName };
    dispatch(setRegistration(newdata));
  };

  // set error data
  const setErrorsData = (error) => {
    dispatch(setErrors(error));
  };

  // submit form data
  const doSubmit = async () => {
    // dispatch(handleNextStep());

    const findUser = data.data.find((d) => d.username === username);
    if (findUser) {
      dispatch(setErrors({ ...errors, username: '"Username" already exist' }));
    } else {
      dispatch(handleNextStep());
    }
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

  // const [data, setData] = useState([]);
  // const getData = async () => {
  //   try {
  //     const { data } = await axios.get("http://localhost:3030/api/user");
  //     setData(data);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };
  // useEffect(() => {
  //   getData();
  // }, []);

  const { data, error } = useSWR("http://localhost:3030/api/user", fetcher);
  if (error) return <div>failed to load</div>;
  if (!data)
    return <div className="text-center text-3xl mt-20">Loading...</div>;

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
          value={username}
          placeholder="enter your username"
          name="username"
          label="username"
          error={errors.username}
        />
        <Input
          type="text"
          onChange={handleChange}
          value={firstName}
          placeholder="enter your firstname"
          name="firstName"
          label="Firstname"
          error={errors.firstName}
        />
        <Input
          type="text"
          onChange={handleChange}
          value={lastName}
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
