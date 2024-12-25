import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchCartItemsById, updateCartItems } from "../api/CartApi";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [userData, setUserData] = useState(null);
    const userId = localStorage.getItem("user");
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (userId) {
            const fetchData = async () => {
                try {
                    const response = await fetchCartItemsById(userId);
                    setUserData(response.data)
                    setCartItems(response.data.cart || []);
                } catch (error) {
                    console.error("Error fetching cart items:", error);
                }
            };
            fetchData();
        }else{
            setCartItems([]);
        }
    }, [user]);


    async function updateCartData(updateData) {
        try {
            const updateUserCart = { ...userData, cart: updateData }
            await updateCartItems(userId, updateUserCart)
            setCartItems(updateData);
        } catch (err) {
            console.error(err)
        }
    }

    const addToCart = (product) => {

        const existingItem = cartItems.find((cartItem) => cartItem.id === product.id);
        let updatedData;
        if (existingItem) {
            updatedData = cartItems.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)

        } else {
            updatedData = [...cartItems, { ...product, quantity: 1 }];
        }
        updateCartData(updatedData)
    };

    const removeFromCart = (id) => {
        const removedCart = cartItems.filter((cartItem) => cartItem.id !== id);
        updateCartData(removedCart);
    };

    const updateQuantity = (productId, quantity) => {
        const newQuantity = cartItems.map((product) => {
            return product.id === productId ? { ...product, quantity } : product
        })
        updateCartData(newQuantity);
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const getTotalPriceOfProduct = (item) => {
        return item.price * item.quantity;
    }

    const clearCart = () => {
        setCartItems([]);
        updateCartData([]);
    }

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, updateQuantity, totalPrice, getTotalPriceOfProduct, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};