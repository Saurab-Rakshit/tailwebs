import { useState } from "react";

const InputField = ({
  label,
  placeholder,
  icon,
  eyeOpenIcon,
  eyeCloseIcon,
  lockIcon,
  fieldName,
  value,
  onChange,
  nameIcon,
  subjectIcon,
  markIcon,
  error,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={fieldName} className="mb-1 text-gray-700">
        {label}
      </label>
      <div className="flex items-center border border-gray-300 rounded-md">
        <div className="p-2 text-gray-600">
        {label === "Username" ? icon :
            label === "Password" ? lockIcon :
              label === "Name" ? nameIcon :
                label === "Subject" ? subjectIcon :
                  label === "Marks" ? markIcon : ""}
        </div>
        <input
          type={label === "Password" && !isPasswordVisible ? "password" : "text"}
          placeholder={placeholder}
          className="flex-grow p-2 focus:outline-none"
          name={fieldName}
          value={value}
          onChange={onChange}
        />
        {label === "Password" && (
          <div className="p-2 cursor-pointer text-gray-600" onClick={togglePasswordVisibility}>
            {isPasswordVisible ? eyeOpenIcon : eyeCloseIcon}
          </div>
        )}
      </div>
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default InputField;

