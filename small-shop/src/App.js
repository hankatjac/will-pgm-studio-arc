import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import NoPage from "./components/NoPage";
import Cart from "./components/Cart/Cart";
import Modal from "./components/Modal";
function App () {

    return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList/>} />
          <Route path="details" element={<Details/>} />
          <Route path="cart" element={<Cart/>} />
          <Route path="*" element={<NoPage/>} />
        </Routes>
        <Modal />
      </BrowserRouter>
    );
  }


export default App;
