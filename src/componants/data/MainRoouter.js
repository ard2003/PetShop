import React, { useState } from "react";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Registration from "./Registration";
import NavBar from "./Navbar";
import { myContext } from "./CreateContext";
import AllColection from "./pages/AllColection";
import Cat from "./pages/Cat";
import Dog from "./pages/Dog";
import { CartProvider } from "react-use-cart";
import Cart from "./Cart";
import Payment from "./Payment";
import { Toaster } from "react-hot-toast";
import NavbarAdmin from "./Adminsection/NavbarAdmin";
import AdminLog from "./Adminsection/AdminLog";
import Prodect from "./Adminsection/Prodect";
import User from "./Adminsection/User";
import ProdectData from "./ProdectData";

const MainRoouter = () => {
  const [serch, setSerch] = useState("");
  const [cart, setCart] = useState([]);
  const [productDatas, setProductDatas]=useState(ProdectData)
  const inputValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(inputValues);
  const [loged, setLoged] = useState(false);
  const [loginValue, setLoginValue] = useState({ email: "", password: "" });
  return (
    <div>
      <Toaster/>
      <myContext.Provider
        value={{
          formValues,
          setFormValues,
          serch,
          setSerch,
          cart,
          setCart,
          loged,
          setLoged,
          inputValues,
          loginValue,
          setLoginValue,
          productDatas, 
          setProductDatas

        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Nav" element={<NavBar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/colection" element={<AllColection />} />
          <Route path="/cat" element={<Cat />} />
          <Route path="/dog" element={<Dog />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/adminlog" element={<AdminLog/>} />
          <Route path="/navbaradmin" element={<NavbarAdmin />} />
          <Route path="/user" element={<User/>} />
          <Route path="/prodectadd" element={<Prodect/>} />

        </Routes>
      </myContext.Provider>
    </div>
  );
};

export default MainRoouter;
