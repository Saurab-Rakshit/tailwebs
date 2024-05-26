import { CiUser, CiLock } from "react-icons/ci";
import { FaEye,FaEyeSlash } from "react-icons/fa";
import InputField from "../component/InputField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({handleAuth}) => {

  const [state, setState] = useState({
    username: "",
    password: "",
    errorMsg:"",        
  });
  
  const validateInput = (name,value)=>{
    
    const alphanumericRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/

    if(value.length < 6){
      return `${name} must be at least 6 characters long.`
    }
    if(!alphanumericRegex.test(value)){
      return `${name} must be alphanumeric and not contain special characters.`
    }

    return "";
  }

  const handleChange = (e) => {
    
    const { name, value } = e.target;

    const errorMsg = validateInput(name,value);

    setState((prevState) => ({
      ...prevState,
      [name]: value,
      errorMsg,
    }));

  };

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault()

    const usernameError = validateInput("username",state.username)
    const passwordError = validateInput("password",state.password)

    if(usernameError || passwordError){
      setState((prevState)=>({
        ...prevState,
        errorMsg: usernameError || passwordError,
      }))
    }else{
      console.log(state.username, "||", state.password);
    }

    
    if(handleAuth(state.username,state.password)){
      navigate('/home');
    }else{
      navigate('/');
    }
    
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-5 bg-gray-100 h-screen">
      <div className="text-center text-2xl text-red-500 font-semibold">tailwebs.</div>
      <div className="max-h-full max-w-full bg-white flex flex-col gap-y-5 px-10 py-5 rounded-lg">
        <div>
          <InputField
            value={state.username}
            label={"Username"}
            type={"text"}
            placeholder={"Username"}
            icon={<CiUser />}
            fieldName="username"
            onChange={handleChange}
          />
        </div>        
        <div className="text-red-500 text-sm flex">{state.errorMsg && state.errorMsg.includes("username") && state.errorMsg}</div>
        <div>
          <InputField
            value={state.password}
            label={"Password"}
            type={"text"}
            placeholder={"Password"}
            eyeOpenIcon={<FaEye />}
            eyeCloseIcon={<FaEyeSlash />}
            lockIcon={<CiLock />}
            fieldName="password"
            onChange={handleChange}
          />
        </div>        
        <div className="text-red-500 text-sm">{state.errorMsg && state.errorMsg.includes("password") && state.errorMsg}</div>
        <div className="flex justify-end">
          <div>
            <p className="text-cyan-600">Forgot Password?</p>
          </div>
        </div>
        <div className="text-center text-white">
          <button className="bg-black px-10 py-2" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>   
  );
};

export default Login;


