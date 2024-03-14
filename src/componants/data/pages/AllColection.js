// AllCollection.js
import React, { useContext, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import ProdectData from "../ProdectData";
import NavBar from "../Navbar";
import { myContext } from "../CreateContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const AllCollection = () => {
  const { cart, setCart, loged,productDatas,loginValue} =
    useContext(myContext);
  const Prodects = productDatas;
  
  const { email } = loginValue;
  const navigate = useNavigate();

  const [filteredProducts, setFilteredProducts] = useState(Prodects);

  const handleSearch = (searchTerm) => {
    const filtered = Prodects.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };
  const handleAddToCart = (data) => {
    if (!loged) {
      toast.error("Please login and continue");
    } else {
      const userCarts = JSON.parse(localStorage.getItem("userCarts")) || {};
      const currentUserCart = userCarts[email] || [];
      const existingItemIndex = currentUserCart.findIndex(
        (item) => item.id === data.id
      );
      if (existingItemIndex !== -1) {
        currentUserCart[existingItemIndex].quantity += 1;
      } else {
        currentUserCart.push({ ...data, quantity: 1 });
      }
      userCarts[email] = currentUserCart;
      localStorage.setItem("userCarts", JSON.stringify(userCarts));
      toast.success("Item added to cart");
    }
  };

  return (
    <>
      <NavBar onSearch={handleSearch} />
      <div className="ui-baraker" style={{ width: "100%", height: "3em" }}>
        <h2 style={{ fontWeight: "bold" }}>
          <span style={{ color: "green" }}>Our</span> Products
        </h2>
      </div>
      <div
        className="product-dtl"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {filteredProducts.map((data, index) => (
          <div key={index}>
            <MDBCard
              style={{
                width: "15em",
                fontFamily: "unset",
                height: "25em",
                marginBottom: "5px",
              }}
            >
              <MDBCardImage
                src={data.image}
                position="top"
                alt="..."
                height={"200"}
              />
              <MDBCardBody>
                <MDBCardTitle>{data.name}</MDBCardTitle>
                <MDBCardText>Price: {data.price}</MDBCardText>
                <MDBBtn onClick={() => handleAddToCart(data)}>Add to cart</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllCollection;
