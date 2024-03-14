import React, { useContext, useState } from "react";
import { myContext } from "../CreateContext";
import './Prodect.css';
import NavbarAdmin from "./NavbarAdmin";
import { Button, Modal } from "react-bootstrap";

const Prodect = () => {
  const { productDatas, setProductDatas,dogOrCat } = useContext(myContext);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });
  const [isAdding, setIsAdding] = useState(false);
  const [show, setShow] = useState(false);
  const handleEdit = (index) => {
    setShow(true) 
    setEditIndex(index);
    setEditData(productDatas[index]);
  };

  const handleSaveEdit = () => {
    const updatedProducts = [...productDatas];
    updatedProducts[editIndex] = editData;
    setProductDatas(updatedProducts);
    setEditIndex(null);
    setEditData({});
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleSaveNewProduct = () => {
    setProductDatas([...productDatas, newProduct]);
    setNewProduct({ name: "", price: "", image: "" });
    setIsAdding(false);
  };

  const handleCancelAdd = () => {
    setNewProduct({ name: "", price: "", image: "" });
    setIsAdding(false);
  };

  const handleDelete = (index) => {
    const updatedProducts = [...productDatas];
    updatedProducts.splice(index, 1);
    setProductDatas(updatedProducts);
  };
  const handleClose = () => setShow(false);
  
  

  return (
    <>
      {isAdding ? (
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          
               
                <input
            type="text"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
            
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          />
          <button onClick={handleSaveNewProduct} className="save-button">Save</button>
          <button onClick={handleCancelAdd}className="cancel-button">Cancel</button>
        </div>
      ) : (
        <button onClick={handleAdd} className="add-button">Add Product</button>,
        <button className="add-button">Add Product</button>
      )}
    <div className="main-body">
    <NavbarAdmin />
    
    <div className="body" >
      
      {productDatas.map((data, index) => {
        if (!dogOrCat|| data.item==dogOrCat) {
          return(
            <div className="card-body" key={index}>
            {editIndex === index ? (
              <div>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="price"
                  value={editData.price}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="image"
                  value={editData.image}
                  onChange={handleChange}
                className="edit-input"/>
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <img src={data.image} alt={data.name} />
                <h4>{data.name}</h4>
                <p>Price: {data.price}</p>
                <button className="delete" onClick={() => handleDelete(index)}>Delete</button>
                <button className="edit" onClick={() => handleEdit(index)}>Edit</button>
              </div>
            )}
          </div>
          )
          
        }
      })}
     
      </div>
    </div>
    </>
  );
};

export default Prodect;
