import React, { useState } from "react";
import axios from "axios";


function ProductForm() {
  const [product, setProduct] = useState({ name: "", description: "", price: "", category: "" });
  const [error, setError] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/addProduct", product);
      console.log("Product created:", response.data);
      setProduct({ name: "", description: "", price: "", category: "" })
    } catch (error) {
      console.error("Error creating product:", error);
      setError("Failed to create product. Please try again later.");
    }
  };


  return (
   
    <div className="form-container">
    <form action="" onSubmit={handleSubmit} className="product-form">
      <h2 className="form-title text-center">Add Product</h2>
      <div className="mb-3 mt-4">
        <input
          type="text"
          className="form-control"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Enter Product Name"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Enter Product Description"
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Enter Product Price"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Enter Product Category"
        />
      </div>
      <div className="text-center">
        <button className="btn btn-success submit-button" type="submit">
          Add Product
        </button>
      </div>
    </form>
  </div>
  

  );
}


export default ProductForm;