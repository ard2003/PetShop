import React, { useState, useContext } from "react";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { myContext } from "./CreateContext";
import toast from "react-hot-toast";
import Cookies from "js-cookie"; // Import Cookies for handling cookies
import { Axios } from "./MainRoouter"; // Correct import path

const Login = () => {
  const { setLoged, setUserData, setLoginValue, loginValue } = useContext(myContext);
  const navigate = useNavigate();
  
  // State to handle form input changes
  const [user, setUser] = useState({ email: "", password: "" });

  // Handle input changes and update state accordingly
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.email || !user.password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      const response = await Axios.post("/user/login", user, { withCredentials: true });
      const { token, userData, message } = response.data;
      
      // Store token and user data in cookies/local storage
      Cookies.set("token", token, { expires: 1 });
      localStorage.setItem("token", token);
      localStorage.setItem("userInfo", JSON.stringify(userData));
      
      // Update context with logged in status and user data
      setLoged(true);
      setUserData(userData);
      
      toast.success(message);
      navigate("/"); // Redirect to home page on successful login
    } catch (error) {
      console.error("Login error", error);
      toast.error(error.response?.data?.message || "Login failed");
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
            value={user.email} // Use state variable 'user' to manage inputs
            onChange={handleChange}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="password"
            type="password"
            name="password"
            value={user.password} // Use state variable 'user' to manage inputs
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
