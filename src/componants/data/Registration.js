import React, { useContext, useEffect, useState } from "react";
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

function Registration() {
  const { formValues, setFormValues } = useContext(myContext);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  console.log(formValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = ValiDate(formValues);
    setFormErrors(errors);
    setIsSubmit(true);
    if (Object.keys(errors).length === 0) {
      console.log(formValues);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("Form submitted successfully");
    }
  }, [formErrors, isSubmit]);

  const ValiDate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "password must be 4than leters";
    }
    localStorage.setItem("username", values.username);
    localStorage.setItem("email", values.email);
    localStorage.setItem("password", values.password);

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
                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="Your Name"
                    id="form1"
                    type="text"
                    name="username"
                    className="w-100"
                    value={formValues.username}
                    onChange={handleChange}
                  />
                  {formErrors.username && (
                    <p className="text-danger">{formErrors.username}</p>
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