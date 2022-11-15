import Joi from "joi-browser";
import axios from "axios";
import useSWR from "swr";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import useForm from "../form/useForm";
import Input from "../input/Input";
import {
  handlePrevStep,
  setErrors,
  setRegistration,
} from "./registrationSlice";

// fetcher method
const fetcher = (url) => axios.get(url).then((res) => res.data);

const FinalStep = () => {
  const router = useRouter();

  const registration = useSelector((state) => state.registration);
  const {
    errors,
    username,
    firstName,
    lastName,
    mobile,
    email,
    password,
    confirmPassword,
  } = registration;
  const dispatch = useDispatch();

  const schema = {
    username: Joi.string().min(4).max(20).required().label("Username"),
    firstName: Joi.string().min(4).max(20).required().label("FirstName"),
    lastName: Joi.string().min(4).max(20).required().label("LastName"),
    mobile: Joi.string().min(11).max(11).required().label("Mobile"),
    email: Joi.string().required().label("email"),
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

  // validation data
  const checkSchema = {
    username: username,
    firstName: firstName,
    lastName: lastName,
    mobile: mobile,
    email: email,
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

  const doSubmit = async () => {
    const findUser = data.data.find((d) => d.username === username);
    if (findUser) {
      dispatch(setErrors({ ...errors, username: '"Username" already exist' }));
    } else {
      let createUser = {
        username,
        firstName,
        lastName,
        mobile,
        email,
        password,
      };
      try {
        await axios.post("http://localhost:3030/api/user", createUser);
        router.push("/dashboard");
      } catch (error) {
        console.error(error.response.data.message);
      }
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

  const { data, error } = useSWR("http://localhost:3030/api/user", fetcher);
  if (error) return <div>failed to load</div>;
  if (!data)
    return <div className="text-center text-3xl mt-20">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <h3 className="text-2xl mb-2 text-sky-300">Registration Form</h3>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col items-center justify-center shadow-md shadow-slate-300 w-[400px] h-full mb-20 border-t-8 border-sky-200"
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

        <Input
          type="password"
          onChange={handleChange}
          value={registration.password}
          placeholder="enter your password"
          name="password"
          label="Password"
          error={errors.password}
        />
        <Input
          type="password"
          onChange={handleChange}
          value={registration.confirmPassword}
          placeholder="enter your confirmPassword"
          name="confirmPassword"
          label="confirmPassword"
          error={errors.confirmPassword}
        />

        <div className="space-x-4 my-4">
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
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FinalStep;
