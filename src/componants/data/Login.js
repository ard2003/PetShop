import React, { useState, useContext } from "react";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { myContext } from "./CreateContext";
import toast from "react-hot-toast";

const Login = () => {
  const { formValues, setLoged, loged } = useContext(myContext);
  const [loginValue, setLoginValue] = useState({ email: "", password: "" });
  const homeNavigater = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginValue({ ...loginValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
   
      if (!loginValue.email || !loginValue.password) {
        toast.error("Please fill in the email and password");
      } else if (
        loginValue.password === storedPassword &&
        loginValue.email === storedEmail
      ) {
        toast.success("Login successful");
        setLoged(true);
        homeNavigater("/");
      } else {
        toast.error("Invalid username or password");
      }
    
  }

  return (
    <div>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <form onSubmit={handleSubmit}>
          <MDBInput
            wrapperClass="mb-4"
            label="Email address"
            id="form1"
            type="email"
            name="email"
            value={loginValue.email}
            onChange={handleChange}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="form2"
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