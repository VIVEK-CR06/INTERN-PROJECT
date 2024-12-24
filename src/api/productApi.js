import axios from 'axios'

const PRODUCT_URL = "http://localhost:5002/products";

export const fetchAllProducts = async () => {
    return axios.get(PRODUCT_URL);
};

export const fetchProductById = async (id) => {
    return axios.get(`${PRODUCT_URL}/${id}`);
};