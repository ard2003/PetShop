import React, { useContext, useState } from "react";
import "./style css/Navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { IoSearch } from "react-icons/io5";
import { BiSolidCartAdd } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { myContext } from "./CreateContext";
import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import Modal from "react-bootstrap/Modal";
import Login from "./Login";
import Button from "react-bootstrap/Button";
import toast from "react-hot-toast";


const NavBar = ({ onSearch }) => {
  const { setSearch,loged,setLoged } = useContext(myContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow =( () => {
  if (loged) {
    toast.error(" all ready login");
  } else {
  setShow(true);}})
  const navigate=useNavigate()

  const handleClick = () => {
    
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  setLoged(false) };

  return (
    <div className="body-nav">
      <div className="nav-top">
        <p>
          Find a Pet Care Centre || Vets for Pets || Pets Grooming || Pets VIP
          Club || Pet Insurance || Flea Subscription || Puppy & Kitten Club
        </p>
      </div>
      <Navbar bg="light" data-bs-theme="light">
        <div className="logo">
          <img
            src="https://desktop.petshome.app/android-chrome-192x192.png"
            alt=""
          onClick={()=>navigate('/adminlog')}/>
        </div>
        <Container style={{ height: "5em" }}>
          <Link to={"/"} className="home-text">
            Home
          </Link>
          <Nav className="me-auto">
            <Link to={"/dog"} className="contents">
              Dog
            </Link>
            <Link to={"/cat"} className="contents">
              Cat
            </Link>
            <Link to={"/colection"} className="contents">
              AllColection
            </Link>
          </Nav>
          <div className="search-container">
            <IoSearch style={{ width: "30px" }} />
            <SearchBar onSearch={onSearch} />
          </div>

          <Link
            to={"/cart"}
            style={{ marginLeft: "15px", width: "5px" }}
            className="contents-icon"
          >
            <BiSolidCartAdd />
          </Link>
          <Link style={{ marginLeft: "23px" }} className="contents-icon">
            <FaUser onClick={handleShow} />
          </Link>
          <>
            <Modal show={show} onHide={handleClose}>
              <Login />
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
          {loged && ( 
            <Link className="logout">
              <IoMdLogOut onClick={handleClick} />
            </Link>
          )}
          <p className="user-dtl">{localStorage.getItem("username")}</p>

         
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
