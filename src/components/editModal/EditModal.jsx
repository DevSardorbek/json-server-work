import React, { useState, useEffect } from "react";

const EditModal = ({ product, onSave, onClose }) => {
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);

  useEffect(() => {
    setTitle(product.title);
    setPrice(product.price);
  }, [product]);

  const handleSave = (e) => {
    e.preventDefault();
    onSave({ ...product, title, price: parseFloat(price) });
  };

  return (
    <>
      <div onClick={onClose} className="overly"></div>
      <div className="modal">
        <form className="edit__modal" onSubmit={handleSave}>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default EditModal;
