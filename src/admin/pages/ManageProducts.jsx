import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import { fetchProducts } from '../../api/AdminApi';
import { addProducts, deleteProduct } from '../../api/AdminApi';
import { useNavigate, NavLink } from 'react-router-dom';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    brand: '',
    name: '',
    price: '',
    image: '',
    description: '',
    display: '',
    processor: '',
    camera: '',
    battery: '',
    storage: '',
    os: '',
  });
  const [showAddProduct, setShowAddProduct] = useState(false);

  useEffect(() => {
    fetchProducts().then((res) => setProducts(res.data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async () => {
    const product = {
      brand: newProduct.brand,
      name: newProduct.name,
      price: newProduct.price,
      image: newProduct.image,
      description: newProduct.description,
      specification: {
        display: newProduct.display,
        processor: newProduct.processor,
        camera: newProduct.camera,
        battery: newProduct.battery,
        storage: newProduct.storage,
        os: newProduct.os,
      },
    };
    const response = await addProducts(product);
    if (response.status === 201) {
      setProducts([...products, { ...newProduct, id: response.data.id }]);
    }
    setNewProduct({
      brand: '',
      name: '',
      price: '',
      image: '',
      description: '',
      display: '',
      processor: '',
      camera: '',
      battery: '',
      storage: '',
      os: '',
    });
    setShowAddProduct(false); // Hide form after adding
  };

  const handleEditProduct = (product) => {
    navigate('/updateproduct', { state: { product } });
  };
  

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    deleteProduct(id);
  };

  return (
    <>
      <AdminNavbar />

      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Manage Products</h1>

        {/* Toggle Add Product Form */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => setShowAddProduct(!showAddProduct)}
        >
          {showAddProduct ? '<< Back' : 'Add Product'}
        </button>

        {/* Add Product Form */}
        {showAddProduct && (
          <div className="bg-white p-6 rounded shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <form className="space-y-4">
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
                className="p-2 border rounded w-full"
              />

              <div className="bg-gray-50 p-4 rounded shadow-inner space-y-4">
                <h3 className="text-lg font-medium mb-2">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="display"
                    placeholder="Display"
                    value={newProduct.display}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="processor"
                    placeholder="Processor"
                    value={newProduct.processor}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="camera"
                    placeholder="Camera"
                    value={newProduct.camera}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="battery"
                    placeholder="Battery"
                    value={newProduct.battery}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="storage"
                    placeholder="Storage"
                    value={newProduct.storage}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="os"
                    placeholder="Operating System"
                    value={newProduct.os}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddProduct}
                className="bg-green-500 text-white px-4 py-2 rounded mt-4"
              >
                Add Product
              </button>
            </form>
          </div>
        )}

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
                  <td className="border p-2">₹{product.price}</td>
                  <td className="border p-2">
                  <NavLink
                   to="/updateproduct"
                  onClick={() => handleEditProduct(product)}
                   className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                    Edit
                    </NavLink>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
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
