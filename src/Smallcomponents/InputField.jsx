const InputField = ({ type, placeholder, setFunction ,value }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      className="mb-4 rounded-full pl-4"
      onChange={
        type === "file"
          ? (e) => setFunction(e.target.files[0])
          : (e) => setFunction(e.target.value)
      }
    />
  );
};
export { InputField };
