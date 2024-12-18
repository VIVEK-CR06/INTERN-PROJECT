import React, {useState} from "react";

const Signup = () => {
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-16 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-12">Sign-Up</h1>
          <div className="mb-4">
            <input
              type="text"
              className="w-full mb-3 px-4 py-2 bg-slate-50 rounded-lg shadow-md hover:bg-slate-100 outline-none"
              placeholder="Enter Username"/>
          </div>
          <div className="mb-4">
          <input
              type="email"
              className="w-full mb-3 px-4 py-2 bg-slate-50 rounded-lg shadow-md hover:bg-slate-100 outline-none"
              placeholder="Enter e-mail"/>
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="w-full px-4 py-2 mb-6 bg-slate-50  rounded-lg shadow-md hover:bg-slate-100 outline-none "
              placeholder="Enter your password"/>

            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mb-6 bg-slate-50  rounded-lg shadow-md hover:bg-slate-100 outline-none "
              placeholder="Confirm password"/>
          </div>
          <button
            type="button"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Sign Up
          </button>
          <div className="flex justify-between">
          <h1 className=" text-sm text-red-500">Already have an account?</h1>
          <button  className="text-sm text-red-500">Login</button>
          </div>
      </div>
    </div>
  );
};

export default Signup;
