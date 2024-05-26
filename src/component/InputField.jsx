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
  error
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div>
      <label htmlFor={fieldName}>{label}</label>
      <div className="flex items-center border border-gray-300 gap-x-2">
        <div className="flex justify-around gap-x-1">
          {label === "Username" ? icon :
            label === "Password" ? lockIcon :
              label === "Name" ? nameIcon :
                label === "Subject" ? subjectIcon :
                  label === "Marks" ? markIcon : ""}
          <div className="h-4 border border-gray-300"></div>
        </div>
        <div className="flex items-center">
          <input
            type={label === "Password" && !isPasswordVisible ? "password" : "text"}
            placeholder={placeholder}
            className="focus:outline-none h-8"
            name={fieldName}
            value={value}
            onChange={onChange}
          />
          {label === "Password" && (
            <div className="mr-1" onClick={togglePasswordVisibility}>
              {isPasswordVisible ? eyeOpenIcon : eyeCloseIcon}
            </div>
          )}
        </div>
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default InputField;
