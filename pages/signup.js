import { useState } from "react";
import { useSelector } from "react-redux";
import FirstStep from "../components/registration/FirstStep";
import SecondStep from "../components/registration/SecondStep";
import ThirdStep from "../components/registration/ThirdStep";
import FinalStep from "./../components/registration/FinalStep";
const signup = () => {
  const registration = useSelector((state) => state.registration);
  // const [registration, setRegistration] = useState({
  //   step: 1,
  //   firstName: "",
  //   lastName: "",
  //   mobile: "",
  //   email: "",
  //   address: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  // const handleNextStep = () => {
  //   let newStep = registration.step + 1;
  //   setRegistration({ ...registration, step: newStep });
  // };

  // const handlePrevStep = () => {
  //   let prevStep = registration.step - 1;
  //   setRegistration({ ...registration, step: prevStep });
  // };

  switch (registration.step) {
    case 1:
      return (
        <FirstStep
        // nextStep={handleNextStep}
        // setRegistration={setRegistration}
        // registration={registration}
        />
      );
    case 2:
      return (
        <SecondStep
        // nextStep={handleNextStep}
        // prevStep={handlePrevStep}
        // setRegistration={setRegistration}
        // registration={registration}
        />
      );
    case 3:
      return (
        <ThirdStep
        // nextStep={handleNextStep}
        // prevStep={handlePrevStep}
        // setRegistration={setRegistration}
        // registration={registration}
        />
      );
    case 4:
      return (
        <FinalStep
        // nextStep={handleNextStep}
        // prevStep={handlePrevStep}
        // setRegistration={setRegistration}
        // registration={registration}
        />
      );
  }
};

export default signup;
