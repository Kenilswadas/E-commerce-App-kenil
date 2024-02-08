const InputField = ({type,placeholder,setFunction}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="mb-4 rounded-full pl-4"
      onChange={(e)=>setFunction(e.target.value)}
    />
  );
};
export { InputField };
