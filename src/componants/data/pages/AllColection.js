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
  const { cart, setCart, loged,productDatas} =
    useContext(myContext);
  const Prodects = productDatas;
  
  const navigate = useNavigate();

  const [filteredProducts, setFilteredProducts] = useState(Prodects);

  const handleSearch = (searchTerm) => {
    const filtered = Prodects.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };
  const AddToCart = (data) => {
    if (!loged) {
     toast.error("Please login and continue");

      
    } else {
      const itemIndex = cart.findIndex((item) => item.id === data.id);
      toast.success('successfully added')
      if (itemIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart[itemIndex].quantity += 1; 
        setCart(updatedCart);
      } else {
        setCart([...cart, { ...data, quantity: 1 }]); 
      }
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
                <MDBBtn onClick={() => AddToCart(data)}>Add to cart</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllCollection;
