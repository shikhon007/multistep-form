import Input from "../input/Input";

const SecondStep = ({ nextStep, prevStep, setRegistration, registration }) => {
  const handleChange = () => {};

  const handlePrevStep = () => {
    prevStep();
  };

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
          value={registration.mobile}
          placeholder="enter your mobile"
          name="mobile"
          label="Mobile"
        />
        <Input
          type="email"
          onChange={handleChange}
          value={registration.email}
          placeholder="enter your email"
          name="email"
          label="email"
        />

        <div className="space-x-4 mt-4">
          <button
            onClick={handlePrevStep}
            className="w-[100px] bg-sky-300 text-white capitalize p-1 rounded-md hover:bg-sky-500"
          >
            prev
          </button>
          <button className="w-[100px] bg-sky-300 text-white capitalize p-1 rounded-md hover:bg-sky-500">
            next
          </button>
        </div>
      </form>
    </div>
  );
};

export default SecondStep;
