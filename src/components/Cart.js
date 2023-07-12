import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Cart.css';
import '../components/Contact.css';

function Cart({ cartItems, setCartItems }) {
  const [itemCount, setItemCount] = useState();
  //const [totalprice, setTotalPrice] = useState('');
  //const [convertPrice, setConvertPrice] = useState('');
  
  useEffect(() =>
  async function () {
    const response = await axios.get("http://localhost:4000/orders",
   { headers: { Accept: "application/json" } })
    setItemCount(cartItems.length)
    //setConvertPrice(response.data);
    //const result = parseFloat(convertPrice);
    //console.log(response.data);
}, [])

async function addToCart() {
  const testNewTitles = cartItems.map(({ title }) => title).join(', ');

  try {
    const response = await axios.post(
      "http://localhost:4000/orders",
      { title: testNewTitles },
      { headers: { Accept: "application/json" } }
    );

    // Update cart state
    setCartItems([]);
    console.log("Order created:", response.data);
  } catch (error) {
    console.error(error);
  }
}



console.log(cartItems)
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-8 cart-box">
          <div className="card">
          <h6>YOUR SHOPPING CART</h6>
            <div className="card-body cart"> <br/>
              {cartItems.map((item, index) => (
              <div key={index}>
                <p>{item.title} {item.price}</p>
              </div>
              ))}
            </div>
          </div>
          <br/>
          <Link to="/products" className="btn btn-outline-secondary btn-sm">Continue Shopping</Link>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <h6>ORDER SUMMARY</h6>
            <p>PLEASE REVIEW YOUR ORDER BELOW THEN CHECKOUT</p>
            <div className="card-body">        
              <div>
                <p className="cart">{itemCount} Item(s)<br/><br/>Total to pay:</p>
                <button className="btn btn-outline-secondary btn-sm checkout-button" onClick={addToCart}>Checkout</button>
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
            <p>Please fill in all fields below before submitting.</p>
            <div className="contact-form">
              <div className="card-body">     
                {formSubmitted ? (
                  <div>
                    <p>Thanks for your order {userfName}, your delivery is on its way!</p>
                  </div>
                ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
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
                      {...register("mmyy", { required: "Enter the expiry date of the card in the MM/YY format", maxLength: 5 })} />
                      {errors.mmyy && (<small>{errors.mmyy.message}</small>)}
                  <div>
                  </div>
                    <input 
                      type="text" 
                      className="form-control"
                      placeholder="CVV"
                      {...register("cvv", { required: "Enter the 3 digit security code on the card", maxLength: 3 })} />
                      {errors.cvv && (<small>{errors.cvv.message}</small>)}
                  </div>
                  <br></br>
                  <button className="btn btn-outline-secondary btn-sm" type="submit">Place Order</button>
                </form>
                )}
              </div>
            </div>
          </div>
      </div>
      </div>
    </div>
  );
}

export default Cart;

