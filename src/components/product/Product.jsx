import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import EditModal from "../editModal/EditModal"; // Ensure this path is correct
import { toast } from "react-toastify";

const API_URL = "http://localhost:4000/products";

const Product = () => {
  const [data, setData] = useState(null);
  const [relaud, setReauld] = useState(true);
  const [editProduct, setEditProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((error) => console.log("Error"));
  }, [relaud]);

  const handleCreateProduct = (e) => {
    e.preventDefault();
    toast.success("Task title cannot be empty");
    let formData = new FormData(e.target);
    let product = {
      title: formData.get("title"),
      price: parseFloat(formData.get("price")),
    };

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((newProduct) => {
        setData((prevData) => [...prevData, newProduct]);
        e.target.reset();
        setReauld((p) => !p);
      })
      .catch((error) => console.log("Error:"));
  };

  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setData((prevData) => prevData.filter((product) => product.id !== id));
      })
      .catch((error) => console.error("Error", error));
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowEditModal(true);
  };

  const handleSaveEdit = (updatedProduct) => {
    fetch(`${API_URL}/${updatedProduct.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => res.json())
      .then((updatedProduct) => {
        setData((prevData) =>
          prevData.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          )
        );
        setShowEditModal(false);
      })
      .catch((error) => console.log("Error "));
  };

  return (
    <div>
      <form onSubmit={handleCreateProduct}>
        <input type="text" name="title" placeholder="add to product" required />
        <input
          type="number"
          name="price"
          placeholder="product price"
          required
        />
        <button type="submit">Send</button>
      </form>
      <div className="product__list">
        {data?.map((el) => (
          <div className="product__list-item" key={el.id}>
            <h2>{el.title}</h2>
            <h4>{el.price}</h4>
            <div className="item__change">
              <button onClick={() => handleDelete(el.id)}>
                <MdDelete />
              </button>
              <button onClick={() => handleEdit(el)}>
                <MdEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
      {showEditModal && (
        <EditModal
          product={editProduct}
          onSave={handleSaveEdit}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default Product;
