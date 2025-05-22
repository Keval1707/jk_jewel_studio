// src/router/PublicRouter.jsx
import React from "react";
import { Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Gallery from "../pages/Gallery";
import Profile from "../pages/Profile";
import Login from "../components/Login";
import Jewellery from "../pages/Jewellery";
import Products from "../components/Products";
import CartPage from "../pages/CartPage";
import PlaceOrder from "../components/PlaceOrder";

const PublicRouter = () => (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/login" element={<Login />} />
    <Route path="/jewellery" element={<Jewellery />} />
    <Route path="/products/:id" element={<Products />} />
    <Route path="/gallery" element={<Gallery />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/placeorder" element={<PlaceOrder />} />
  </>
);

export default PublicRouter;
