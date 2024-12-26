import axios from "axios";

const USER_URL = 'https://e-app-server-wjvm.onrender.com/users';

export const fetchUsers = () => {
    return axios.get(USER_URL);
};

export const addUser = (userData) => {
    return axios.post(USER_URL, userData);
}

export const checkEmail = async (email) => {
    const { data: users } = await fetchUsers();
    return users.some((user) => user.email === email);
}

export const checkUsername = async (username) => {
    const {data : users} = await fetchUsers();
    return users.some((user) => user.username === username)
}