import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import ProductList from './components/ProductList';
import Home from './views/Home';
import About from './views/About';
import Contact from './views/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Login from './components/Login';
import Signup from './components/Signup';
import GlutenFreeProducts from './components/GlutenFreeProducts';
import DiaryFreeProducts from './components/DiaryFreeProducts';
import EditAccountInfo from './components/EditAccountInfo';

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<ProductList cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/gluten-free" element={<GlutenFreeProducts />} />
          <Route path="/diary-free" element={<DiaryFreeProducts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login/edit" element={<EditAccountInfo />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
