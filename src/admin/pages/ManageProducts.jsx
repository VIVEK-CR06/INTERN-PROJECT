// src/components/ProductManagement.js

import React, { useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar';

const ManageProducts = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Sample Product 1',
      price: 29.99,
      image: 'https://via.placeholder.com/150',
      isSoldOut: false,
    },
    {
      id: 2,
      name: 'Sample Product 2',
      price: 49.99,
      image: 'https://via.placeholder.com/150',
      isSoldOut: false,
    },
  ]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const [editingProductId, setEditingProductId] = useState(null);

  const handleAddProduct = () => {
    const newProduct = {
      id: Date.now(),
      name: productName,
      price: productPrice,
      image: productImage,
      isSoldOut: false,
    };
    setProducts([...products, newProduct]);
    setProductName('');
    setProductPrice('');
    setProductImage('');
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEditProduct = (id) => {
    const productToEdit = products.find((product) => product.id === id);
    setProductName(productToEdit.name);
    setProductPrice(productToEdit.price);
    setProductImage(productToEdit.image);
    setEditingProductId(id);
  };

  const handleSaveEdit = () => {
    const updatedProducts = products.map((product) =>
      product.id === editingProductId
        ? { ...product, name: productName, price: productPrice, image: productImage }
        : product
    );
    setProducts(updatedProducts);
    setEditingProductId(null);
    setProductName('');
    setProductPrice('');
    setProductImage('');
  };

  const handleSoldOut = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, isSoldOut: !product.isSoldOut } : product
      )
    );
  };

  return (
    <>
      <AdminNavbar />
      <div className="p-4 space-y-6">
        {/* Add/Edit Product Form */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product Name"
            className="flex-1 p-2 border border-gray-300 rounded-md w-full"
          />
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder="Product Price"
            className="flex-1 p-2 border border-gray-300 rounded-md w-full"
          />
          <input
            type="text"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
            placeholder="Product Image URL"
            className="flex-1 p-2 border border-gray-300 rounded-md w-full"
          />
          {editingProductId ? (
            <button
              onClick={handleSaveEdit}
              className="bg-green-500 text-white px-4 py-2 rounded-md w-full md:w-auto"
            >
              Save Edit
            </button>
          ) : (
            <button
              onClick={handleAddProduct}
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full md:w-auto"
            >
              Add Product
            </button>
          )}
        </div>

        {/* Products List */}
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col md:flex-row items-center justify-between p-4 border border-gray-200 rounded-md"
            >
              <div className="flex items-center space-x-4 w-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-gray-500">${product.price}</p>
                  {product.isSoldOut && (
                    <span className="text-red-500 font-semibold">Sold Out</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mt-4 md:mt-0">
                <button
                  onClick={() => handleEditProduct(product.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md w-full md:w-auto"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md w-full md:w-auto"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleSoldOut(product.id)}
                  className={`${
                    product.isSoldOut ? 'bg-gray-500' : 'bg-orange-500'
                  } text-white px-3 py-1 rounded-md w-full md:w-auto`}
                >
                  {product.isSoldOut ? 'Mark Available' : 'Mark Sold Out'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ManageProducts;
