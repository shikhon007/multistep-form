import Link from "next/link";
import { useState } from "react";
import Joi from "joi-browser";
import Input from "../components/input/Input";

export default function Home() {
  // const [login, setLogin] = useState({
  //   username: "",
  //   password: "",
  // });

  // const handleChange = () => {};
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("submit");
  // };

  const [login, setLogin] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "" });

  const schema = {
    username: Joi.string().required().label("UserName"),
    password: Joi.string().required().label("Password"),
  };

  const validateLogin = () => {
    const { error } = Joi.validate(login, schema, { abortEarly: false });
    if (!error) return null;

    const loginError = {};
    for (let item of error.details) loginError[item.path[0]] = item.message;

    return loginError;
  };

  // const doSubmit = async () => {
  //   try {
  //     const { data } = await api.post("/auth", userLogin);
  //     localStorage.setItem("token", data);
  //     const status = localStorage.getItem("status");
  //     if (!status) {
  //       localStorage.setItem("status", JSON.stringify(true));
  //       onLogin();
  //     }

  //     setLogin("");
  //     navigate("/dashboard", { replace: true });
  //   } catch (err) {
  //     // setLoading(false);
  //     if (err.response && err.response.status === 400) {
  //       setErrors({ ...errors, username: err.response.data.message });
  //     }
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errors = validateLogin();
    setErrors({ ...errors, errors: errors || {} });
    if (errors) return;

    const userLogin = {
      username: login.username,
      password: login.password,
    };

    console.log("userlogin", userLogin);

    // try {
    //   const { data } = await api.post("/auth", userLogin);
    //   localStorage.setItem("token", data);
    //   const status = localStorage.getItem("status");
    //   if (!status) {
    //     localStorage.setItem("status", JSON.stringify(true));
    //     onLogin();
    //   }

    //   setLogin("");
    //   navigate("/dashboard", { replace: true });
    // } catch (err) {
    //   // setLoading(false);
    //   if (err.response && err.response.status === 400) {
    //     setErrors({ ...errors, username: err.response.data.message });
    //   }
    // }
  };

  const validateProperty = ({ name, value }) => {
    //const { name, value } = event.target;
    const obj = { [name]: value };
    const subSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, subSchema);
    return error ? error.details[0].message : null;
  };

  const handleChange = ({ target: input }) => {
    //const { name, value } = event.target;
    let errorData = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) {
      errorData[input.name] = errorMessage;
    } else {
      delete errorData[input.name];
    }
    let loginData = { ...login };
    console.log(loginData);
    loginData[input.name] = input.value;
    setLogin(loginData);
    setErrors(errorData);
    //setSignUp({...signUp,[input.name]: input.value});
    //setErrors({...errors,errors})
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h3 className="text-2xl mb-5 text-sky-500">Login Form</h3>
      <div></div>
      <form className="flex flex-col items-center justify-center shadow-md shadow-slate-300 w-[400px] h-[450px] border-t-4 border-sky-300">
        <Input
          type="text"
          onChange={handleChange}
          value={login.username}
          placeholder="enter your name"
          name="username"
          label="Username"
          error={errors.username}
        />
        <Input
          type="password"
          onChange={handleChange}
          value={login.password}
          placeholder="enter your password"
          name="password"
          label="Password"
          error={errors.password}
        />
        <button
          onClick={handleLogin}
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
}
