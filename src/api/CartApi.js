import axios from 'axios'

const USER_URL = "http://localhost:5003/users";

export const fetchCartItemsById = (id) => {
    return axios.get(`${USER_URL}/${id}`);
}

export const updateCartItems = (id, cartItems) => {
    const response = axios.put(`${USER_URL}/${id}`, cartItems);
    return response.data;
}

