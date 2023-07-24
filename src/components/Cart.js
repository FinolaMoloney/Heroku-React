import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Cart.css';
import '../components/Contact.css';
import './Login';

function Cart({ cartItems, setCartItems, user}) {
  const [itemCount, setItemCount] = useState(0);
  const [emptyMsg, setEmptyMsg] = useState('');
  const [confirmationMsg, setConfirmationMsg] = useState('');
  let [convertPrice, setConvertPrice] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);
  const [grossCost, setGrossCost] = useState([]);
  const [totalItems, setTotalItems] = useState([])

 //Return cart items 
  useEffect(() => {
  async function fetchData () {
    const response = await axios.get("http://localhost:4000/orders", {
      headers: { Accept: "application/json" },
    });
    setItemCount(cartItems.length)
    const convertedPrice = cartItems.map(({ price }) => parseFloat(price)).reduce((a, b) => a + b, 0);
    setConvertPrice(convertedPrice);

    const formattedTotalPrice = convertedPrice.toFixed(2);
    setTotalPrice(formattedTotalPrice);

    const updatedCartItems = cartItems.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCartItems(updatedCartItems);
    const totalQuantity = updatedCartItems.reduce((total, item) => total + item.quantity, 0);
    setItemCount(totalQuantity);

    // Set the initial state for totalItems
    const newTotalQuantity = updatedCartItems.map((item) => item.quantity);
    setTotalItems(newTotalQuantity);

    // Calculate the total price and gross cost for each item
    const newTotalPrice = updatedCartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);

    const newOrderPrice = updatedCartItems.map((item) => item.price * item.quantity);
      setGrossCost(newOrderPrice);
  }
    fetchData();
}, [])

//create a new order in backend
  async function addToCart(e) {
    e.preventDefault();
    if (cartItems.length === 0) {
      console.log("No items in the cart");
      return (
        setEmptyMsg("Oops looks like your cart is empty, please add items before checking out!")
      );
    }
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    if (totalQuantity === 0) {
      console.log("Cart is empty");
      return setEmptyMsg("Oops looks like your cart is empty, please add items before checking out!");
    }
    
    const newOrderTitles = cartItems.map(({ title }) => title).join(', ');
    const newOrderDescription = cartItems.map(({ description }) => description).join(', ');
   
    try {
      const response = await axios.post(
        "http://localhost:4000/orders",
        {
          title: newOrderTitles,
          description: newOrderDescription,
          price: totalPrice,
          quantity: totalQuantity,
          email_address: userEmail,
        },
        { headers: { Accept: "application/json" } }
      );
      // Update cart state
      setCartItems([]);
      return (
        setConfirmationMsg(`Thanks for your order ${userfName}, your delivery is on its way!`)
      );
    } catch (error) {
      console.error(error);
    }
  }

  //add or remove products functionality
  const handleQuantityChange = (index, quantityChange) => {
    const updatedCartItems = [...cartItems];
    const updatedItem = { ...updatedCartItems[index] };
    updatedItem.quantity += quantityChange;
    
    if (updatedItem.quantity < 0) {
      updatedItem.quantity = 0;
    }
    updatedCartItems[index] = updatedItem;

    setCartItems(updatedCartItems);

    const totalQuantity = updatedCartItems.reduce((total, item) => total + item.quantity, 0);
    setItemCount(totalQuantity);

    const newTotalQuantity = updatedCartItems.map((item) => item.quantity, 0);
    setTotalItems(newTotalQuantity);

    const newTotalPrice = updatedCartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
    setTotalPrice(newTotalPrice.toFixed(2));

    const newOrderPrice = updatedCartItems.map((item) => item.price * item.quantity);
    setGrossCost(newOrderPrice);
};
   
  const sumGrossCost = grossCost.reduce((total, price) => total + parseFloat(price), 0).toFixed(2);
  const sumTotalItems = totalItems.reduce((total, quantity) => total + quantity, 0)
  console.log(itemCount)

  //Checkout Details
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userfName, setUserFName] = useState("");
  const onSubmit = (data) => {
    setFormSubmitted(true);
    setUserEmail(data.email);
    setUserFName(data.name);
  };

  return (
    <div className="background">
      <div className="row banner">
        <h3>YOUR CART</h3>
      </div> 
      <div className="container-fluid">
      <div className="row">
        <div className="col-sm-8 cart-box">
          <div className="card">
          <h6>YOUR SHOPPING CART</h6>
            <div className="card-body cart"> <br/>
              {cartItems.map((item, index) => (
              <div className="row" key={index}>
                <table>
                  <thead>
                  <tr>
                    <th className="col-sm-3">Product:</th><th className="col-sm-6">Description:</th><th className="col-sm-2">Price:</th><th className="col-sm-1">Quality:</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="col-sm-3">{item.title}</td><td className="col-sm-6">{item.description}</td><td className="col-sm-2">€ {item.price}</td>
                      <div className="quantity-control">
                      <td className="col-sm-1"><button className="btn btn-outline-secondary btn-sm" onClick={() => handleQuantityChange(index, -1)}>-</button></td><td className="col-sm-1"><p className="item-quantity">{item.quantity}</p></td><td className="col-sm-1"><button className="btn btn-outline-secondary btn-sm" onClick={() => handleQuantityChange(index, 1)}
                      >+</button></td>
                    </div>
                    </tr>
                  </tbody>
                </table>
              </div>
              ))}
            </div>
          </div>
          <br/>
          <Link to="/products" className="btn btn-outline-secondary btn-sm">Continue Shopping</Link>
          <p>{emptyMsg}</p>
          <p>{confirmationMsg}</p>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <h6>ORDER SUMMARY</h6>
            <p>PLEASE REVIEW YOUR ORDER BELOW THEN CHECKOUT</p>
            <div className="card-body">        
              <div>
                <p className="cart">Number of Item(s) in cart: {sumTotalItems}<br/><br/>Total to pay: € {sumGrossCost}</p>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-8">
                
        </div>
      <div className="col-sm-4 ">
          <div className="card">
            <h6>CHECKOUT</h6>
            <div className="contact-form">
              <div className="card-body">     
                {formSubmitted ? (
                  <div>
                    <button className="btn btn-outline-secondary btn-sm" type="submit" onClick={addToCart}>Pay Now</button>
                  </div>
                ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <p className="faq-card">Please fill in all fields below before submitting.</p>
                  <h6>PERSONAL DETAILS</h6>
                  <div>
                    <input 
                      type="text" 
                      className="form-control"
                      placeholder="First Name"
                      {...register("name", { required: "First Name is required" })} />
                      {errors.name && (<small>{errors.name.message}</small>)}
                  </div>
                  <div>
                    <input 
                      type="text" 
                      className="form-control"
                      placeholder="Last Name" 
                      {...register("lastName", { required: "Last Name is required" })} />
                      {errors.lastName && (<small>{errors.lastName.message}</small>)}
                  </div>
                  <div>
                  <input 
                      type="number" 
                      className="form-control"
                      placeholder="Phone Number"
                      {...register("phoneNumber", { required: "Phone Number is required" })} />
                      {errors.phoneNumber && (<small>{errors.phoneNumber.message}</small>)}
                  </div>
                  <div>
                    <input 
                      type="text" 
                      className="form-control"
                      placeholder="Email" 
                      {...register("email", {
                      required: "Email is required", 
                      pattern: {
                          value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
                          message: "A valid email is required"
                      }
                      })}/>
                      {errors.email && (<small>{errors.email.message}</small>)}
                  </div>
                  <div>
                    <input 
                      type="text" 
                      className="form-control"
                      placeholder="Delivery Address"
                      {...register("address", { required: "Delivery address is required" })} />
                      {errors.address && (<small>{errors.address.message}</small>)}
                  </div>
                  <br></br>
                  <div>
                    <h6>CARD DETAILS</h6>
                    <input 
                      type="text" 
                      className="form-control"
                      placeholder="Card Name"
                      {...register("cardName", { required: "Card name is required" })} />
                      {errors.cardName && (<small>{errors.cardName.message}</small>)}
                  </div>
                  <div>
                    <input 
                      type="number" 
                      className="form-control"
                      placeholder="Card Number"
                      {...register("cardNumber", { required: "Card Number is required" })} />
                      {errors.cardNumber && (<small>{errors.cardNumber.message}</small>)}
                  </div>
                  <div>
                    <input 
                      type="text" 
                      className="form-control"
                      placeholder="MM/YY"
                      {...register("mmyy", { required: "Enter the expiry date of the card in the MM/YY format", pattern: {
                        value: /^\d{2}\/\d{2}$/,
                        message: "You must enter 5 characters in the format MM/YY"
                      }
                      })} />
                      {errors.mmyy && (<small>{errors.mmyy.message}</small>)}
                  </div>
                  <div>
                    <input 
                      type="number" 
                      className="form-control"
                      placeholder="CVV"
                      {...register("cvv", { required: "Enter the 3 digit security code on the card", 
                      pattern: {
                        value: /^\d{3}$/,
                        message: "You must enter 3 numbers for the CVV" } 
                      })} />
                      {errors.cvv && (<small>{errors.cvv.message}</small>)}
                  </div>
                  <br></br>
                  <button className="btn btn-outline-secondary btn-sm" type="submit">Confirm Details</button>
                </form>
                )}
              </div>
            </div>
          </div>
      </div>
      </div>
      </div>
    </div>
  );
}

export default Cart;

