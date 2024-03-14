import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import Cart from "./Cart";

const Payment = () => {
  return (
    <section
      className="h-100 h-custom"
      style={{
        backgroundColor: "#eee",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <MDBCol lg="5">
        <MDBCard className="bg-primary text-white rounded-3">
          <MDBCardBody>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <MDBTypography tag="h5" className="mb-0">
                Card details
              </MDBTypography>
            </div>

            <p className="small">Card type</p>
            <a href="#!" type="submit" className="text-white">
              <MDBIcon fab icon="cc-mastercard fa-2x me-2" />
            </a>
            <a href="#!" type="submit" className="text-white">
              <MDBIcon fab icon="cc-visa fa-2x me-2" />
            </a>
            <a href="#!" type="submit" className="text-white">
              <MDBIcon fab icon="cc-amex fa-2x me-2" />
            </a>
            <a href="#!" type="submit" className="text-white">
              <MDBIcon fab icon="cc-paypal fa-2x me-2" />
            </a>

            <form className="mt-4">
              <MDBInput
                className="mb-4"
                label="Cardholder's Name"
                type="text"
                size="lg"
                placeholder="Cardholder's Name"
                contrast
              />

              <MDBInput
                className="mb-4"
                label="Card Number"
                type="text"
                size="lg"
                minLength="19"
                maxLength="19"
                placeholder="1234 5678 9012 3457"
                contrast
              />

              <MDBRow className="mb-4">
                <MDBCol md="6">
                  <MDBInput
                    className="mb-4"
                    label="Expiration"
                    type="text"
                    size="lg"
                    minLength="7"
                    maxLength="7"
                    placeholder="MM/YYYY"
                    contrast
                  />
                </MDBCol>
                <MDBCol md="6">
                  <MDBInput
                    className="mb-4"
                    label="Cvv"
                    type="text"
                    size="lg"
                    minLength="3"
                    maxLength="3"
                    placeholder="&#9679;&#9679;&#9679;"
                    contrast
                  />
                </MDBCol>
              </MDBRow>
            </form>

            <hr />

            <div className="d-flex justify-content-between">
              <p className="mb-2"></p>
              <p className="mb-2"></p>
            </div>

            <div className="d-flex justify-content-between">
              <p className="mb-2">Shipping</p>
              <p className="mb-2">$</p>
            </div>

            <div className="d-flex justify-content-between">
              <p className="mb-2">Total(Incl. taxes)</p>
              <p className="mb-2">$</p>
            </div>

            <MDBBtn color="info" block size="lg">
              <div className="d-flex justify-content-between">
                <span>$</span>
                <span>
                  Checkout <i className="fas fa-long-arrow-alt-right ms-2"></i>
                </span>
              </div>
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </section>
  );
};

export default Payment;
