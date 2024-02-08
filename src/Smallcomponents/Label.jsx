const Label = ({ name }) => {
  return (
    <label htmlFor={name} className="mb-4 font-semibold text-[#747264]">
      {name}
      {" : "}
    </label>
  );
};

export { Label };
