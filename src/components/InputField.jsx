//React
import React from "react";

const InputField = ({ label, type, value, onChange, error }) => (
  <div>
    <label className="flex font-bold ml-20 text-sm text-cyan-200">{label}:</label>
    <input
      className="w-40 mb-2 border border-solid border-gray-300 rounded-md"
      type={type}
      value={value}
      onChange={onChange}
    />
    {error && <div className="text-red-900 text-xs">{error}</div>}
  </div>
);

export default InputField;
