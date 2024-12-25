import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';
import { updateProduct } from '../../api/AdminApi';

const UpdateProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};
  
  const [updatedProduct, setUpdatedProduct] = useState({
    brand: product?.brand || '',
    name: product?.name || '',
    price: product?.price || '',
    image: product?.image || '',
    description: product?.description || '',
    display: product?.specification?.display || '',
    processor: product?.specification?.processor || '',
    camera: product?.specification?.camera || '',
    battery: product?.specification?.battery || '',
    storage: product?.specification?.storage || '',
    os: product?.specification?.os || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleSaveChanges = () => {
    updateProduct(product.id, {
      ...updatedProduct,
      specification: {
        display: updatedProduct.display,
        processor: updatedProduct.processor,
        camera: updatedProduct.camera,
        battery: updatedProduct.battery,
        storage: updatedProduct.storage,
        os: updatedProduct.os,
      },
    });
    navigate('/manageproducts'); // Navigate back to ManageProducts page
  };

  return (
    <>
      <AdminNavbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="brand"
                placeholder="Brand"
                value={updatedProduct.brand}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={updatedProduct.name}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={updatedProduct.price}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={updatedProduct.image}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              value={updatedProduct.description}
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
                  value={updatedProduct.display}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="processor"
                  placeholder="Processor"
                  value={updatedProduct.processor}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="camera"
                  placeholder="Camera"
                  value={updatedProduct.camera}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="battery"
                  placeholder="Battery"
                  value={updatedProduct.battery}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="storage"
                  placeholder="Storage"
                  value={updatedProduct.storage}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="os"
                  placeholder="Operating System"
                  value={updatedProduct.os}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleSaveChanges}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
