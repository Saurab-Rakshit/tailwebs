import { Routes,Route,Navigate } from "react-router-dom";
import Login from "./pages/Login";
import StudentList from "./pages/StudentList";
import { useState } from "react";


const App = () => {

  const [isAuthenticated,setIsAuthenticated] = useState(false);

  const handleAuth = (username,password)=>{
    if(username ==="Saurab19" && password === "Saurab19"){
      setIsAuthenticated(true)
      return true;
    }else{
      return false;
    }
  }

  const handelLogout = ()=>{
    setIsAuthenticated(false);    
  }

  return (
    <div>
      <Routes>
        <Route path='/' element={<Login handleAuth={handleAuth}/>} />        
        <Route path='/home' element={isAuthenticated ?<StudentList handleLogout={handelLogout}/>:<Navigate to='/'/>}  />        
      </Routes>
    </div>
  )
}

export default App;


