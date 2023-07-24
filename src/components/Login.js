import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './SignUp.css';
import Product from './Product';
import NourishAndSproutLogo from '../images/home/NourishAndSproutLogo.jpg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [customerData, setCustomerData] = useState(null);
  const [userfName, setUserFName] = useState("");
  const [userlName, setUserLName] = useState("");
  const [userAddress, setAddress] = useState("");
  const [userPhone, setPhone] = useState();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [editMsg, setEditMsg] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [viewOrdersMode, setViewOrdersMode] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [orderEmail, setOrderEmail] = useState('');
  const navigate = useNavigate();
  const [orderExists, setOrderExists] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.get(
        'http://127.0.0.1:4000/customers',
        { headers: { Accept: 'application/json' }})

      // Find the customer with matching email and password
      const matchedCustomer = response.data.find (customer => customer.email_address === email && customer.password === password);

      if (matchedCustomer) {
        setLoggedIn(true);
        setCustomerData(matchedCustomer);
        setUser(matchedCustomer.id);
      } else {
        return('Login failed!');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  } 
  
    function handleFName(e) {
        e.preventDefault();
        setUserFName(e.target.value)
    }
    function handleLName(e) {
        e.preventDefault();
        setUserLName(e.target.value)
    }
    function handleAddress(e) {
        e.preventDefault();
        setAddress(e.target.value)
    }
    function handlePhone(e) {
      e.preventDefault();
      setPhone(e.target.value)
    }


  async function handleupdateInfo(e) {
    e.preventDefault();
    try {
    var response = await axios.put(`http://127.0.0.1:4000/customers/${user}`,
    {
      first_name: userfName,
      last_name: userlName,
      address: userAddress,
      email_address: userEmail,
      phone_number: userPhone,
      password: userPassword
    },
        {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json' 
            }, })
    const updatedCustomer = response.data;
    setEditMsg("You have successfully updated your details");
    setCustomerData(updatedCustomer);
    setEditMode(false);
  } catch(e) {
    setEditMsg(e.response.error)
  }
  }
  function handleBacktoInfo() {
    setEditMode(false);
  }

  function handleLogout() {
    setLoggedOut(true);
    setLoggedIn(false);
    setCustomerData(null);
    navigate('/login');
  }
  useEffect(() => {
    async function fetchOrderEmail() {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/customers/${user}`, {
          headers: { Accept: 'application/json' },
        });
        setOrderEmail(response.data.email_address);
      } catch (error) {
        console.error('Error occurred:', error);
      }
    }
    fetchOrderEmail();
  }, [user]);
  
  const handleOrderHistoryCheck = async (data) => {
    try {
      const response = await axios.get('http://127.0.0.1:4000/orders', {
        headers: { Accept: 'application/json' },
      });
      const orders = response.data;
      const orderExists = orders.some(order => order.email === data.email);       
      setOrderExists(orderExists);
  
      if (!orderExists) {
        // Email has no previous orders
        console.log('No previous orders');
        
      } else {
        // Email has previous orders
        console.log('Previous orders found');
        const userOrders = orders.filter(order => order.email === data.email);
        setOrderHistory(userOrders);
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <div className="background">
      <div className="row banner">
        <h3>Your Account</h3>
      </div>     
        <div className="container">
            <div className="row">
                <div className="col-sm-6">  
                        {!loggedIn ? (
                        <Form className="contactFormBorder"onSubmit={handleSubmit}>
                          <h3>LOG IN BELOW</h3>
                          <br/>
                          <p>Enter your details below to log in</p>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <button className="btn btn-outline-secondary btn-sm" type="submit">Submit</button>
                        </Form>
                    ) : (
                        <div className="col-sm-12">
                          <button className="btn btn-outline-secondary btn-sm logout-btn"onClick={handleLogout}>Logout</button>
                          <h2>Welcome back, {customerData.first_name}!</h2><br/><br/>
                          {!editMode ? (
                          <>
                          <p>Profile information:</p>
                          <ul>
                              <li>First Name: {customerData.first_name}</li>
                              <li>Last Name: {customerData.last_name}</li>
                              <li>Address: {customerData.address}</li>
                              <li>Phone Number: {customerData.phone_number}</li>
                              <li>Email: {customerData.email_address}</li>
                          </ul>
                          <div className="row loginPg-btn">
                          <button className="btn btn-outline-secondary btn-sm col-sm-5 loginPg-btn" onClick={() => setEditMode(true)}>Update your information here</button>
                          <button className="btn btn-outline-secondary btn-sm col-sm-5 loginPg-btn" type="submit" onClick={handleOrderHistoryCheck} >View your previous orders here</button>
                          </div>
                          {orderHistory
                            .filter(order => order.email_address === customerData.email_address)
                            .map(order => (
                              <div key={order.id}>
                                <h4>Order ID: {order.id}</h4>
                                <p>Title: {order.title}</p>
                                <p>Description: {order.description}</p>
                                <p>Price: {order.price}</p>
                                <p>Email Address: {order.email_address}</p>
                                <hr />
                              </div>
                            ))}
                          </>
                          ):(
                          <div className="row">
                            <form className="contactFormBorder">
                              <h6>Update your details below</h6>
                              <input value={userfName} type="text" className="form-control" placeholder="First Name" onChange={handleFName}/><br/>
                              <input value={userlName} type="text" className="form-control" placeholder="Last Name" onChange={handleLName}/><br/>
                              <input value={userAddress} type="text" className="form-control" placeholder="Address" onChange={handleAddress}/><br/>
                              <input value={userPhone} type="number" className="form-control" placeholder="Phone Number" onChange={handlePhone}/><br/>
                              <button className="btn btn-outline-secondary btn-sm" onClick={handleupdateInfo}>Update</button>
                             <button className="btn btn-outline-secondary btn-sm" onClick={handleBacktoInfo}>Back to your account</button>
                              <p>{editMsg}</p>
                            </form>
                          </div>
                          )}
                      </div>
                    )}
                </div>
                <div className="col-sm-6">
                {!loggedIn && (
                    <img className="smallLogo" src={NourishAndSproutLogo} alt="NourishAndSproutLogo" />
                    )}
                </div>
            </div>
        </div>
    </div>
  );
}

export default Login;


