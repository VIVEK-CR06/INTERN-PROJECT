import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { userLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setSuccess("");

    try {
      if (!usernameOrEmail || !password) {
        throw new Error("All fields are required!");
      }

      await userLogin({ usernameOrEmail, password });
      setSuccess("Logged in successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-16 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-12">Login</h1>
        <div className="mb-4">
          <input
            type="text"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            className="w-full mb-5 px-4 py-2 bg-slate-50 rounded-lg shadow-md hover:bg-slate-100 outline-none"
            placeholder="Enter Username or Email"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-6 bg-slate-50  rounded-lg shadow-md hover:bg-slate-100 outline-none"
            placeholder="Enter your password"
          />
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <button
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-blue-500 hover:underline"
          >
            Forgot Password?
          </button>
        </div>
        <button
          type="button"
          onClick={handleLogin}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
        <div className="flex justify-between mt-4">
          <p className="text-gray-500 text-sm">Don't have an account?</p>
          <button
            onClick={() => navigate("/signup")}
            className="text-sm text-blue-500 hover:underline"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
