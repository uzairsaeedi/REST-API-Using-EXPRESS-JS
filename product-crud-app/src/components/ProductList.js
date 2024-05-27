import React, { useState, useEffect } from "react";
import axios from "axios";


function ProductList() {
  const [products, setProducts] = useState([]);
  const [updateProduct,setUpdateProduct] = useState({_id : "", name: "", description: "", price: "", category: "" })
  const [error, setError] = useState(null);
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getAllProduct");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products. Please try again later.");
    }
  };


  useEffect(() => {
   
    fetchProducts();
  }, []);


  const deleteHandler = async (id) =>{
    try {
      const reponse = await axios.delete(`http://localhost:5000/delete/${id}`)
      fetchProducts()
    } catch (error) {
      console.error("Error Deleting products:", error);
    }
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateProduct({ ...updateProduct, [name]: value });
  };


  const updateHandler=(id,name,description,price,category) =>{
    setUpdateProduct({
      _id:id,
      name,description,price,category
    })
  }


  const submitUpdate = async (id) =>{
    try {
      const reponse = await axios.put(`http://localhost:5000/update/${id}`,updateProduct)
      console.log(reponse)
      fetchProducts()
    } catch (error) {
      console.error("Error Deleting products:", error);
    }
  }
  return (
    <>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Your Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <div className="mb-3 mt-4">
          <input type="text" className="form-control" name="name" value={updateProduct.name} onChange={handleChange} placeholder="Enter Product Name"/>
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" name="description" value={updateProduct.description} onChange={handleChange} placeholder="Enter Product Description"/>
        </div>
        <div className="mb-3">
          <input type="number" className="form-control" name="price" value={updateProduct.price} onChange={handleChange} placeholder="Enter Product Price"/>
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" name="category" value={updateProduct.category} onChange={handleChange} placeholder="Enter Product Category"/>
        </div>
        <div className="text-center">
          <button className="btn btn-success" data-bs-dismiss="modal" style={{width: '200px'}} onClick={() => {submitUpdate(updateProduct._id)}} type="submit">Update Product</button>
        </div>
      </div>
    </div>
  </div>
</div>

<div className="product-list-container">
  {error && <p className="error-message">{error}</p>}
  <h2 className="text-center product-list-title">Product List</h2>
  <ul className="list-group mt-4">
    {products.map((product) => (
      <li key={product._id} className="list-group-item list-group-item-success d-flex justify-content-between">
        <div>{product.name} - ${product.price}</div>
        <div>
          <i className="fa fa-pencil mb-2" type="button" onClick={() => {updateHandler(product._id, product.name, product.description, product.price, product.category)}} data-bs-toggle="modal" data-bs-target="#exampleModal" aria-hidden="true"></i>
          <i className="fa fa-trash mx-3 mb-2" onClick={() => {deleteHandler(product._id)}} aria-hidden="true"></i>
        </div>
      </li>
    ))}
  </ul>
</div>


    </>
  );
}


export default ProductList;
