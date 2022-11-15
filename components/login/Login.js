import Link from "next/link";
import { useState } from "react";
import Joi from "joi-browser";
import useSWR from "swr";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setErrors, setLogin } from "./loginSlice";
import Input from "../input/Input";
import useForm from "../form/useForm";

// const fetcher = (url) => axios.get(url).then((res) => res.data);

const Login = () => {
  //   const [login, setLogin] = useState({
  //     username: "",
  //     password: "",
  //   });

  const login = useSelector((state) => state.login);
  const { username, password, errors } = login;
  const dispatch = useDispatch();

  const schema = {
    username: Joi.string().required().label("UserName"),
    password: Joi.string().required().label("Password"),
  };
  //   const [errors, setErrors] = useState({ username: "" });

  const checkSchema = {
    username: username,
    password: password,
  };

  const setLoginData = (data, inputName) => {
    let newData = { data, inputName };
    dispatch(setLogin(newData));
  };

  const setErrorData = (error) => {
    dispatch(setErrors(error));
  };

  const doSubmit = () => {
    let loginData = {
      username,
      password,
    };
  };

  // calling custom hooks
  const { handleChange, handleSubmit } = useForm(
    schema,
    checkSchema,
    login,
    setLoginData,
    errors,
    setErrorData,
    doSubmit
  );

  //   const { data, error } = useSWR("http://localhost:3030/api/user", fetcher);

  //   if (error) return <div>failed to load</div>;
  //   if (!data) return <div>Loading...</div>;
  //   console.log(data);
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h3 className="text-2xl mb-5 text-sky-300">Login Form</h3>
      <form className="flex flex-col items-center justify-center shadow-md shadow-slate-300 w-[400px] h-[450px] border-t-8 border-sky-200">
        <Input
          type="text"
          onChange={handleChange}
          value={username}
          placeholder="enter your name"
          name="username"
          label="Username"
          error={errors.username}
        />
        <Input
          type="password"
          onChange={handleChange}
          value={password}
          placeholder="enter your password"
          name="password"
          label="Password"
          error={errors.password}
        />
        <button
          onClick={handleSubmit}
          className="w-[300px] bg-sky-300 mt-4 text-white capitalize p-2 rounded-md hover:bg-sky-500"
        >
          login
        </button>
        <p className=" capitalize text-sky-500">or</p>

        <Link href="/signup">
          <button className="w-[300px] bg-sky-300 text-white capitalize p-2 rounded-md hover:bg-sky-500">
            sign up
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
