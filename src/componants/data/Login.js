import React, { useState, useContext } from "react";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { myContext } from "./CreateContext";
import toast from "react-hot-toast";

const Login = () => {
  const { setLoged, setUserData,loginValue, setLoginValue } = useContext(myContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginValue({ ...loginValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Retrieve user data from local storage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find(
      (storedUser) =>
        storedUser.email === loginValue.email &&
        storedUser.password === loginValue.password
    );
    if (!user) {
      toast.error("Invalid email or password");
    } else {
      setLoged(true);
      setUserData(user);
      setLoginValue(user)
      toast.success("Login successful");
      navigate("/");
    }
  };

  return (
    <div>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <form onSubmit={handleSubmit}>
          <MDBInput
            wrapperClass="mb-4"
            label="Email address"
            id="email"
            type="email"
            name="email"
            value={loginValue.email}
            onChange={handleChange}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="password"
            type="password"
            name="password"
            value={loginValue.password}
            onChange={handleChange}
          />
          <MDBBtn type="submit" className="mb-4">
            Sign in
          </MDBBtn>
        </form>
        <div className="text-center">
          <p>
            Not a member? <Link to="/registration">Register</Link>
          </p>
        </div>
      </MDBContainer>
    </div>
  );
};

export default Login;