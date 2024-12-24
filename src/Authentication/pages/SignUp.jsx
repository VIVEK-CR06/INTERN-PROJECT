import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { userSignup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");
    setSuccess("");

    if (!username || !email || !password || !confirmpassword) {
      setError("All fields are required!");
      return;
    }

    if (password !== confirmpassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      await userSignup({ username, email, password });
      setSuccess("Sign-up successful! Redirecting...");
      setTimeout(() => navigate("/"), 1000); // Navigate after showing success
    } catch (error) {
      setError(error.message || "Sign-up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h1>
        <div className="mb-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter Username"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter Email"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter Password"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Confirm Password"
          />
          {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
          {success && <p className="mt-2 text-green-500 text-sm">{success}</p>}
        </div>
        <button
          type="button"
          onClick={handleSignup}
          disabled={loading}
          className={`w-full px-4 py-2 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 transition ${loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <div className="flex justify-between mt-4 text-sm">
          <p className="text-gray-500">Already have an account?</p>
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
