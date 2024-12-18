import React from "react";
const Login = () => {




    return (
        <>
                    <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-16 bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-12">Login</h1>
                    <div className="mb-4">
                        <input
                            type="text"
                            id="text"
                            className="w-full mb-5 px-4 py-2 bg-slate-50 rounded-lg shadow-md hover:bg-slate-100 outline-none"
                            placeholder="Enter Username"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 mb-6 bg-slate-50  rounded-lg shadow-md hover:bg-slate-100 outline-none "
                            placeholder="Enter your password"
                        />
                        <h1 className=" text-sm text-red-500">Forgott Password</h1>
                    </div>
                    <button
                        type="button"
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                    <div className="flex justify-between">

                        <h1 className=" text-red-500 text-sm">Don't have an account?</h1>
                        {/* <navlink>Sign-Up</navlink> */}
                        <button className="text-sm text-red-500">Sign Up</button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Login;
