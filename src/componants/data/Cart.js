import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import { myContext } from "./CreateContext";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/CartSlice";


const Cart = () => {
  const navigate = useNavigate();
  const { loged, loginValue } = useContext(myContext);
  const { email } = loginValue;

  // Access cart state from Redux store
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const updateCart = (updatedCart) => {
    const carts = JSON.parse(localStorage.getItem("userCarts")) || {};
    carts[email] = updatedCart;
    localStorage.setItem("userCarts", JSON.stringify(carts));
  };

  const updateQuantityHandler = (itemId, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    );
    dispatch(updateQuantity({ id: itemId, quantity }));
    updateCart(updatedCart);
  };

  const deleteItemHandler = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    dispatch(removeFromCart({ id: itemId }));
    updateCart(updatedCart);
  };

  const total = cartItems.reduce(
    (val, item) => val + item.price * item.quantity,
    0
  );

  return (
    <>
      <NavBar />
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card shopping-cart" style={{ borderRadius: "15px" }}>
                <div className="card-body text-black">
                  <div className="row">
                    <div className="col-lg-7 px-5 py-4">
                      <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase">
                        Your products
                      </h3>
                      <div className="flex-shrink-0">
                        <p>{cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your cart</p>
                      </div>
                      <div>
                        {cartItems.map((item) => (
                          <div key={item.id} className="d-flex align-items-center mb-5">
                            <div className="flex-shrink-0">
                              <img
                                src={item.image}
                                className="img-fluid"
                                style={{ width: "150px" }}
                                alt="Product image"
                              />
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h5 className="text-primary">{item.name}</h5>
                              <div className="d-flex align-items-center">
                                <p className="fw-bold mb-0 me-5 pe-3">${item.price}</p>
                                <div className="def-number-input number-input safari_only">
                                  <button
                                    className="minus"
                                    onClick={() => updateQuantityHandler(item.id, item.quantity - 1)}
                                  >
                                    -
                                  </button>
                                  <input
                                    className="quantity"
                                    type="text"
                                    value={item.quantity}
                                    readOnly
                                  />
                                  <button
                                    className="plus"
                                    onClick={() => updateQuantityHandler(item.id, item.quantity + 1)}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                            <hr className="mb-4" style={{ height: "2px", backgroundColor: "#1266f1", opacity: 1 }} />
                            <div className="d-flex justify-content-between p-2 mb-2" style={{ backgroundColor: "#e1f5fe" }}>
                              <h5 className="fw-bold mb-0">Total:</h5>
                              <h5 className="fw-bold mb-0">${(item.price * item.quantity).toFixed(2)}</h5>
                            </div>
                            <button className="btn btn-danger" onClick={() => deleteItemHandler(item.id)}>Delete</button>
                          </div>
                        ))}
                      </div>
                      <button
                        className="btn btn-primary btn-lg"
                        onClick={() => {
                          if (cartItems.length === 0) {
                            alert("Your cart is empty");
                          } else {
                            navigate("/payment");
                          }
                        }}
                      >
                        Buy now
                      </button>
                      <h5 className="fw-bold mb-5" style={{ bottom: "0" }}>
                        <Link to={"/collection"}> Back to shopping</Link>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
