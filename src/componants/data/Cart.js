import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import { myContext } from "./CreateContext";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import toast from "react-hot-toast";

const Cart = () => {
  const navigate = useNavigate();
  const { loged, loginValue } = useContext(myContext);
  const { email } = loginValue;
  const [userCarts, setUserCarts] = useState(() => {
    const carts = JSON.parse(localStorage.getItem("userCarts")) || {};
    return carts[email] || [];
  });

  if(!loged){
    toast.error('your cart empty')
  }else{

  const updateCart = (updatedCart) => {
    const carts = JSON.parse(localStorage.getItem("userCarts")) || {};
    carts[email] = updatedCart;
    localStorage.setItem("userCarts", JSON.stringify(carts));
    setUserCarts(updatedCart);
  };

  const updateQuantity = (itemId, amount) => {
    const updatedCart = userCarts.map((item) =>
      item.id === itemId ? { ...item, quantity: (item.quantity || 1) + amount } : item
    );
    updateCart(updatedCart);
  };

  const deleteItem = (itemId) => {
    const updatedCart = userCarts.filter((item) => item.id !== itemId);
    updateCart(updatedCart);
  };

  const total = userCarts
    .reduce((val, item) => val + item.price * (item.quantity || 1), 0)
    .toFixed(2);

  return (
    <>
      <NavBar />
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="h-100 py-5">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol>
              <MDBCard className="shopping-cart" style={{ borderRadius: "15px" }}>
                <MDBCardBody className="text-black">
                  <MDBRow>
                    <MDBCol lg="7" className="px-5 py-4">
                      <MDBTypography tag="h3" className="mb-5 pt-2 text-center fw-bold text-uppercase">
                        Your products
                      </MDBTypography>
                      <div className="flex-shrink-0">
                        <p>{userCarts.length} item{userCarts.length !== 1 ? "s" : ""} in your cart</p>
                      </div>
                      <div>
                        {userCarts.map((value) => {
                          const { image, name, price, quantity, id } = value;
                          return (
                            <div key={id} className="d-flex align-items-center mb-5">
                              <div className="flex-shrink-0">
                                <MDBCardImage
                                  src={image}
                                  fluid
                                  style={{ width: "150px" }}
                                  alt="Product image"
                                />
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <MDBTypography tag="h5" className="text-primary">{name}</MDBTypography>
                                <div className="d-flex align-items-center">
                                  <p className="fw-bold mb-0 me-5 pe-3">${price}</p>
                                  <div className="def-number-input number-input safari_only">
                                    <button className="minus" onClick={() => updateQuantity(id, -1)}>-</button>
                                    <p className="lead d-flex fw-normal mb-0">{quantity || 1}</p>
                                    <button className="plus" onClick={() => updateQuantity(id, 1)}>+</button>
                                  </div>
                                </div>
                              </div>
                              <hr className="mb-4" style={{ height: "2px", backgroundColor: "#1266f1", opacity: 1 }} />
                              <div className="d-flex justify-content-between p-2 mb-2" style={{ backgroundColor: "#e1f5fe" }}>
                                <MDBTypography tag="h5" className="fw-bold mb-0">Total:</MDBTypography>
                                <MDBTypography tag="h5" className="fw-bold mb-0">${(price * (quantity || 1)).toFixed(2)}</MDBTypography>
                              </div>
                              <button className="plus" onClick={() => deleteItem(id)}>Delete</button>
                            </div>
                          );
                        })}
                      </div>
                      <MDBBtn
                        block
                        size="lg"
                        onClick={() => {
                          if (userCarts.length === 0) {
                            toast.error("Your cart is empty");
                          } else {
                            navigate("/payment");
                          }
                        }}
                      >
                        Buy now
                      </MDBBtn>
                      <MDBTypography tag="h5" className="fw-bold mb-5" style={{ bottom: "0" }}>
                        <Link to={"/collection"}> Back to shopping</Link>
                      </MDBTypography>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
                      }
};

export default Cart;
