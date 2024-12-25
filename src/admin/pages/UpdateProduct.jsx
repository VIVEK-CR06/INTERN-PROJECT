import React, { useEffect, useState } from "react";
import AdminNavbar from '../../components/AdminNavbar';
import { fetchProductById } from "../../api/productApi";
import { updateProduct } from "../../api/AdminApi";
import { useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const productId = localStorage.getItem("productId");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    brand: "",
    price: "",
    image: "",
    rating: "",
    description: "",
    specification: {
      display: "",
      processor: "",
      ram: "",
      camera: "",
      battery: "",
      storage: "",
      os: "",
    },
  });
  const [loading, setLoading] = useState(true); // Loading state for fetching product
  const [error, setError] = useState(null); // Error state for fetching product

  useEffect(() => {
    const fetchingProduct = async () => {
      try {
        setLoading(true);
        const { data: response } = await fetchProductById(productId);
        setFormData(response);
      } catch (error) {
        setError('Failed to fetch product details, please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchingProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.specification) {
      setFormData((prevState) => ({
        ...prevState,
        specification: {
          ...prevState.specification,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(productId, formData);
      navigate('/manageproducts');
    } catch (error) {
      setError('Failed to update the product, please try again later.');
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
        {loading ? (
          <div>Loading product details...</div>
        ) : (
          <div className="bg-white p-6 rounded shadow">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Brand"
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Product Name"
                  className="p-2 border rounded"
                />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Image URL"
                  className="p-2 border rounded"
                />
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="p-2 border rounded w-full"
              />
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(formData.specification).map((spec) => (
                  <input
                    key={spec}
                    type="text"
                    name={spec}
                    value={formData.specification[spec]}
                    onChange={handleChange}
                    placeholder={spec.charAt(0).toUpperCase() + spec.slice(1)}
                    className="p-2 border rounded"
                  />
                ))}
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </form>
            {error && <div className="text-red-500 mt-4">{error}</div>}
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateProduct;
