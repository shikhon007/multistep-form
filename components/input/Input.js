const Input = ({ name, label, type, onChange, value, placeholder, error, isRequired }) => {
  return (
    <div className="flex flex-col mt-4">
      <label className=" capitalize" htmlFor={name}>
        {label} {isRequired && <span className=" text-red-300">**</span>}
      </label>
      <input
        type={type}
        id={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        name={name}
        className="justify-center border-b-2 border-sky-500 outline-none rounded py-2 w-[300px]"
      />
      {error && <p className=" text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
};

export default Input;
