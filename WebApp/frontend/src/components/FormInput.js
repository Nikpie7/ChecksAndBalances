import {
  react,
  useState
} from 'react';

const FormInput = ({name, label, placeholder, handleChange, credObj, password, className}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block text-gray-700">{label}</label>
      <input
        type={password ? "password" : "text"}
        id={name}
        name={name}
        value={credObj[name]}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default FormInput;