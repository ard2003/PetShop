import React, { useContext } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";

import NavBar from "../Navbar";
import { myContext } from "../CreateContext";

const Cat = () => {
  const { productDatas } = useContext(myContext);

  const catItem = productDatas;
  const catItems = catItem .filter((items) => items.item === "cat-food");
  return (
    <div>
      <div>
        <NavBar/>
      </div>
      <div>
        <h1 style={{ fontFamily: '"Poppins", sans-serif' }}>
          <span style={{ color: "green" }}>our</span> cat products
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {catItems.map((items) => {
          return (
            <MDBCard
              key={items.id} 
              style={{
                width: "15em",
                fontFamily: "unset",
                height: "25em",
                marginBottom: "5px",
              }}
            >
              <MDBCardImage
                src={items.image}
                position="top"
                alt="..."
                height={200}
              />
              <MDBCardBody>
                <MDBCardTitle>{items.name}</MDBCardTitle>
                <MDBCardText>price: {items.price}</MDBCardText>
                <MDBBtn href="#">Add to cart</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          );
        })}
      </div>
    </div>
  );
};

export default Cat;
