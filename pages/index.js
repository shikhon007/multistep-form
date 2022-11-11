import Link from "next/link";
import { useState } from "react";
import Joi from "joi-browser";
import Input from "../components/input/Input";
import useForm from "../components/form/useForm";

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

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const schema = {
    username: Joi.string().required().label("UserName"),
    password: Joi.string().required().label("Password"),
  };
  const [errors, setErrors] = useState({ username: "" });

  const checkSchema = {
    username: login.username,
    password: login.password
  }

  const doSubmit = () => {
    console.log("submitted")
  }


  // calling custom hooks
  const { handleChange, handleSubmit } = useForm(schema, checkSchema, login, setLogin, errors, setErrors, doSubmit)

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
  //};


  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h3 className="text-2xl mb-5 text-sky-300">Login Form</h3>
      <form className="flex flex-col items-center justify-center shadow-md shadow-slate-300 w-[400px] h-[450px] border-t-8 border-sky-200">
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
}
