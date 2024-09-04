// Registration.js
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import { myContext } from "./CreateContext";
import { Axios } from "./MainRoouter";
import toast from "react-hot-toast";

function Registration() {
  const { setUserData } = useContext(myContext);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);

    
    if (Object.keys(errors).length === 0) {
      try {
        // Send form values to backend to register user
        const response = await Axios.post("/user/registration", formValues);

        if (response.status === 201) {
          toast.success("Registration successful");
          setUserData(response.data); // Set user data if needed in the context
          navigate("/colection"); // Redirect to login after successful registration
        }
      } catch (error) {
        // Handle backend validation errors
        if (error.response && error.response.data) {
          toast.error(error.response.data.message || "Registration failed");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
    }
  };

  
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be at least 4 characters long";
    }
    return errors;
  };

  return (
    <MDBContainer fluid>
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol
              md="10"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                Sign up
              </p>

              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="Your Name"
                    id="form1"
                    type="text"
                    name="name"
                    className="w-100"
                    value={formValues.name}
                    onChange={handleChange}
                  />
                  {formErrors.name && (
                    <p className="text-danger">{formErrors.name}</p>
                  )}
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput
                    label="Your Email"
                    id="form2"
                    name="email"
                    type="email"
                    value={formValues.email}
                    onChange={handleChange}
                  />
                  {formErrors.email && (
                    <p className="text-danger">{formErrors.email}</p>
                  )}
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    label="Password"
                    id="form3"
                    name="password"
                    type="password"
                    value={formValues.password}
                    onChange={handleChange}
                  />
                  {formErrors.password && (
                    <p className="text-danger">{formErrors.password}</p>
                  )}
                </div>

                <MDBBtn className="mb-4" type="submit" size="lg">
                  Register
                </MDBBtn>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Registration;
