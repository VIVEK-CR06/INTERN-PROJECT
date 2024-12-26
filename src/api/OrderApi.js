import axios from "axios";

const ORDER_URL = 'https://e-app-server-wjvm.onrender.com/orders';

export const fetchOrderById = (id) => {
    return axios.get(`${ORDER_URL}?userId=${id}`);
}

export const addNewOrder = (newOrder) => {
    const response = axios.post(ORDER_URL, newOrder);
    return response.data;
}