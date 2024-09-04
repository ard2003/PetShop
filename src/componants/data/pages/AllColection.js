// AllCollection.js
import React, { useContext, useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/CartSlice"; // Import addToCart action from your CartSlice
import { Axios } from "../MainRoouter";

const AllCollection = () => {
  const { loged, serch } = useContext(myContext); // Context values for search and logged-in status
  const [products, setProducts] = useState([]); // State to hold all products
  const [filteredProducts, setFilteredProducts] = useState([]); // State to hold filtered products
  const dispatch = useDispatch();

  // Fetch product data from the backend when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("/user/products"); // Fetch products from backend API
        setProducts(response.data); // Set the fetched products
        setFilteredProducts(response.data); // Initially, filtered products are the same as fetched products
      } catch (error) {
        console.error("Error fetching Product", error);
      }
    };

    fetchData();
  }, []);

  // Update filtered products when the search term changes
  useEffect(() => {
    handleSearch(serch);
  }, [serch, products]); // Re-run search when `serch` or `products` change

  // Filter products based on the search term
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      // If search term is empty, reset filtered products to all products
      setFilteredProducts(products);
    } else {
      // Filter products based on the search term
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };


const AddtoCart = async (product) => {
 
  if (loged) {
    try {
      
      const response = await Axios.post(
        "/user/add/cart",
        { productId: product._id },
        { withCredentials: true } 
      );
      if (response.status === 200) {
        toast.success("Product added to cart"); 
      } else {
        toast.error("Failed to add product to cart"); 
      }
    } catch (error) {
      // Handle errors that occur during the request
      console.error("Error adding product to cart:", error);
      if (error.response && error.response.status === 401) {
        // Specific handling for unauthorized errors
        toast.error("Please login and continue");
      } else {
        toast.error("Something went wrong. Please try again later."); // General error message
      }
    }
  } else {
    // Notify the user if they are not logged in
    toast.error("Please login and continue");
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
                alt="Product"
                height={"200"}
              />
              <MDBCardBody>
                <MDBCardTitle>{data.name}</MDBCardTitle>
                <MDBCardText>Price: {data.price}</MDBCardText>
                <MDBBtn onClick={() => AddtoCart(data)}>Add to cart</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllCollection;
