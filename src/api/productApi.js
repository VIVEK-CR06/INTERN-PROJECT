import axios from 'axios'

const PRODUCT_URL = "https://e-app-server-wjvm.onrender.com/products";

export const fetchAllProducts = async () => {
    return axios.get(PRODUCT_URL);
};

export const fetchProductById = async (id) => {
    return axios.get(`${PRODUCT_URL}/${id}`);
};