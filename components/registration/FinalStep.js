import Joi from "joi-browser";
import { useState } from "react";
import useForm from "../form/useForm";
import Input from "../input/Input";

const FinalStep = ({ prevStep, setRegistration, registration }) => {

    const schema = {
        firstName: Joi.string().min(4).max(20).required().label("FirstName"),
        lastName: Joi.string().min(4).max(20).required().label("LastName"),
        mobile: Joi.string().min(11).max(11).required().label("Mobile"),
        email: Joi.string().required().label("email"),
        password: Joi.string().min(8).max(20).required().label('Password'),
        confirmPassword: Joi.any().equal(Joi.ref('password'))
            .required()
            .label('Confirm password')
    };

    // validation data
    const checkSchema = {
        firstName: registration.firstName,
        lastName: registration.lastName,
        mobile: registration.mobile,
        email: registration.email,
        password: registration.password,
        confirmPassword: registration.confirmPassword
    };

    // handle Error
    const [errors, setErrors] = useState({});


    const handlePrevStep = () => {
        prevStep();
    };

    const doSubmit = () => {
        console.log("data is submitted")
    }

    const { handleChange, handleSubmit } = useForm(schema, checkSchema, registration, setRegistration, errors, setErrors, doSubmit)


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
                        onClick={handlePrevStep}
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
