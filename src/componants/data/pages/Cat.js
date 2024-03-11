import React from "react";
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

const Cat = () => {
  const catItem = ProdectData;
  const catItems = catItem. 
  return (
    <div>
       <div>
        <NavBar/>
       </div>
       <div>
       <h1 style={{fontFamily:'"Poppins", sans-serif' }}><span style={{color:'green'}}>our</span> cat prodects</h1>
       </div>
    
    <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}>
      {catItems.map((items) => {
        return (
          <MDBCard
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
              height={"200"}
            />
            <MDBCardBody>
              <MDBCardTitle>{items.name}</MDBCardTitle>
              <MDBCardText>price:{items.price}</MDBCardText>
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
