import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  
  
  const handleSignup = async () => {

    if(!username || !email || !password || !confirmpassword) {
      setError("All fields are required!");
      return;
    }

    if(!validEmail){
      setError("Invalid email!");
      return;
    }

    if(password != confirmpassword) {
      setError("Password do not match!")
      return;
    }

    try{
        const respones = await axios.get("http://localhost:5002/users",{
        params:{username},
      });
      
      if(respones.data.length > 0){
        setError("Username already exist");
        return;
      }

      await axios.post("http://localhost:5002/users",{
        username,
        email,
        password,
      });

      localStorage.setItem("username",username);

      navigate("/home")
    }
    catch(err){
      setError("Error signing up");
    }
  };





  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-16 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-12">Sign-Up</h1>
          <div className="mb-4">
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mb-3 px-4 py-2 bg-slate-50 rounded-lg shadow-md hover:bg-slate-100 outline-none"
              placeholder="Enter Username"/>
          </div>
          <div className="mb-4">
          <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-3 px-4 py-2 bg-slate-50 rounded-lg shadow-md hover:bg-slate-100 outline-none"
              placeholder="Enter e-mail"/>
          </div>
          <div className="mb-4">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mb-6 bg-slate-50  rounded-lg shadow-md hover:bg-slate-100 outline-none "
              placeholder="Enter your password"/>

            <input
              type="password"
              id="password"
              onChange={(e) => setConfirmpassword(e.target.value)}
              className="w-full px-4 py-2 mb-6 bg-slate-50  rounded-lg shadow-md hover:bg-slate-100 outline-none "
              placeholder="Confirm password"/>
              {error && <p className="text-red-500">{error}</p>}
          </div>
          <button
            type="button"
            onClick={handleSignup}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Sign Up
          </button>
          <div className="flex justify-between">
          <h1 className=" text-sm text-red-500">Already have an account?</h1>
          <button onClick={() => navigate("/login")} className="text-sm text-red-500">Login</button>
          </div>
      </div>
    </div>
  );
};

export default Signup;
