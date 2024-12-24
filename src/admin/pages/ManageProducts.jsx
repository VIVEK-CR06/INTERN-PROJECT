import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import { fetchProducts } from '../../api/AdminApi';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState([]);

  useEffect(() => {
    fetchProducts().then(res => setProducts(res.data));
  }, []);
    
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = () => {
    setProducts([
      ...products,
      { ...newProduct, id: Date.now(), price: parseFloat(newProduct.price) },
    ]);
    setNewProduct({ brand: '', name: '', price: '', image: '', description: '', specification: '' });
  };

  // const handleEditProduct = (id) => {
  //   // Logic for editing a product
  //   const updatedProducts = products.map((product) =>
  //     product.id === id ? { ...product, ...newProduct } : product
  //   );
  //   setProducts(updatedProducts);
  // };

  // const handleDeleteProduct = (id) => {
  //   setProducts(products.filter((product) => product.id !== id));
  // };

  return (
        <>

        <AdminNavbar/>
    
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Manage Products</h1>

      {/* Add Product Form */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={newProduct.brand}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
        </div>
        <textarea
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleInputChange}
          className="p-2 border rounded w-full mt-4"
        />
        <textarea
          name="specifications"
          placeholder="Specifications"
          value={newProduct.specification}
          onChange={handleInputChange}
          className="p-2 border rounded w-full mt-4"
        />
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Add Product
        </button>
      </div>

      {/* Product List */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Product List</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Image</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Brand</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="text-center">
                <td className="border p-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-contain mx-auto"
                  />
                </td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.brand}</td>
                <td className="border p-2">₹{product.price.toFixed(2)}</td>
                <td className="border p-2">
                  <button
                    // onClick={() => handleEditProduct(product.id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    // onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default ManageProducts;
