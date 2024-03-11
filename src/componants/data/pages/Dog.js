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

const Dog = () => {
    const dogItem = ProdectData;
    const dogItems = dogItem.filter((items) => items.item === "dog-food");
    return (
      <div>
         <div>
          <NavBar/>
         </div>
         <div>
          <img src="https://cdn.media.amplience.net/i/petsathome/mg-3-for-2-dt_2/.webp?w=1900&" style={{marginBottom:"10px", height:"10em", marginTop:'20px'}}></img>
         </div>
         <p style={{fontFamily:'"Poppins", sans-serif',fontSize:'2rem',fontWeight:'bold'}}><span style={{color:'green'}}>Dog</span> products</p>
      
      <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}>
        {dogItems.map((items) => {
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

export default Dog