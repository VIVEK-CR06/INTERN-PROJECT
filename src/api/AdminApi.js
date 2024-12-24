import axios from "axios";

const UserURL = "http://localhost:5003/users";
const OrderURL = "http://localhost:5003/orders";
const ProductURL = "http://localhost:5002/products";

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


