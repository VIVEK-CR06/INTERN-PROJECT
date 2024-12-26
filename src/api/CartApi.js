import axios from 'axios'

const USER_URL = "https://e-app-server-wjvm.onrender.com/users";

export const fetchCartItemsById = (id) => {
    return axios.get(`${USER_URL}/${id}`);
}

export const updateCartItems = (id, cartItems) => {
    const response = axios.put(`${USER_URL}/${id}`, cartItems);
    return response.data;
}

