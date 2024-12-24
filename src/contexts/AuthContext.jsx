import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { addUser, checkUsername, checkEmail, fetchUsers } from '../api/userApi'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const userSignup = async (userData) => {
        try {
            const emailExist = await checkEmail(userData.email);
            if (emailExist) {
                throw new Error("An account already exists in this email");
            }

            const usernameExist = await checkUsername(userData.username);
            if (usernameExist) {
                throw new Error("Username already in use.");
            }

            const newUser = {
                ...userData,
                "role": "user",
                "block": false,
                "cart": []
            };

            const response = await addUser(newUser);
            localStorage.setItem("user", response.data.id );
            localStorage.setItem("username", response.data.username );
            localStorage.setItem("role", "user");
            setUser(newUser);

            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (error) {
            throw error;
        }
    }

    const userLogin = async (userData) => {
        try {
            const { data: users } = await fetchUsers();

            const foundedUser = users.find((user) =>
                (user.username === userData.usernameOrEmail || user.email === userData.usernameOrEmail) && user.password === userData.password
            );

            if (!foundedUser) {
                throw new Error("Invalid Username or Password");
            }

            if (foundedUser.block) {
                throw new Error("Your account is blocked");
            }
            localStorage.setItem("user", foundedUser.id );
            localStorage.setItem("username", foundedUser.username );
            localStorage.setItem("role", foundedUser.role)

            setUser(foundedUser);
            if(foundedUser.role === "user") {
            setTimeout(() => {
                navigate("/");
            }, 1000);}
            else {
                setTimeout(() => {
                    navigate("/adminhome");
                }, 1000);
            }

        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        setUser(null);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, userSignup, userLogin, logout }} >
            {children}
        </AuthContext.Provider>
    )
};