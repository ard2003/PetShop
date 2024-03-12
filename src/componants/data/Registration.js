import React, { useState, useContext } from "react";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { myContext } from "./CreateContext";
import toast from "react-hot-toast";

const Registration = () => {
  const { setLoged, setUserData } = useContext(myContext);
  const [registrationValue, setRegistrationValue] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationValue({ ...registrationValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save user data in local storage
    localStorage.setItem("userData", JSON.stringify(registrationValue));
    setLoged(true);
    setUserData(registrationValue); // Set user data in context
    toast.success("Registration successful");
    navigate("/");
  };

  return (
    <div>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <form onSubmit={handleSubmit}>
          <MDBInput
            wrapperClass="mb-4"
            label="Username"
            id="username"
            type="text"
            name="username"
            value={registrationValue.username}
            onChange={handleChange}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Email address"
            id="email"
            type="email"
            name="email"
            value={registrationValue.email}
            onChange={handleChange}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="password"
            type="password"
            name="password"
            value={registrationValue.password}
            onChange={handleChange}
          />
          <MDBBtn type="submit" className="mb-4">
            Register
          </MDBBtn>
        </form>
        <div className="text-center">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </MDBContainer>
    </div>
  );
};

export default Registration;
