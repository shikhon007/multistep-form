import { useState } from "react";
import FirstStep from "../components/registration/FirstStep";
import SecondStep from "../components/registration/SecondStep";
const signup = () => {
  const [registration, setRegistration] = useState({
    step: 1,
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleNextStep = () => {
    let newStep = step + 1;
    setRegistration({ ...registration, step: newStep });
  };

  const handlePrevStep = () => {
    let prevStep = step - 1;
    setRegistration({ ...registration, step: prevStep });
  };

  switch (registration.step) {
    case 1:
      return (
        <FirstStep
          nextStep={handleNextStep}
          setRegistration={setRegistration}
          registration={registration}
        />
      );
    case 2:
      return (
        <SecondStep
          nextStep={handleNextStep}
          prevStep={handlePrevStep}
          setRegistration={setRegistration}
          registration={registration}
        />
      );
  }
};

export default signup;
