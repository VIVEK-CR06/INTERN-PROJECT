import axios from "axios";

const UserURL = "https://e-app-server-wjvm.onrender.com/users";
const OrderURL = "https://e-app-server-wjvm.onrender.com/orders";
const ProductURL = "https://e-app-server-wjvm.onrender.com/products";

export const fetchUsers = async () => {
  return await axios.get(UserURL);
}

export const fetchOrders = async () => {
  return await axios.get(OrderURL);
}

export const fetchProducts = async () => {
  return await axios.get(ProductURL);
}

export const updateUser = async (id, data) => {
    return await axios.patch(`${UserURL}/${id}`, data);
}

export const addProducts = async (data) => {
    return await axios.post(ProductURL, data);
}

export const updateProduct = async (id, data) => {
    await axios.put(`${ProductURL}/${id}`, data);
    return await fetchProducts();
}

export const deleteProduct = async (id) => {
    return await axios.delete(`${ProductURL}/${id}`);
}