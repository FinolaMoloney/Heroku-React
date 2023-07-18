import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './SignUp.css';
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
        setAddress(e.target.checked)
    }
    function handlePhone(e) {
      e.preventDefault();
      setPhone(e.target.checked)
    }
    function handlePassword(e) {
      e.preventDefault();
      setUserPassword(e.target.checked)
    }
      
  async function handleupdateInfo(e) {
    e.preventDefault();
    try {
    var response = await axios.put(`http://127.0.0.1:4000/customers/${user}`,
    {
      first_name: userfName,
      last_name: userlName,
      address: userAddress,
      phone_number: userPhone,
      password: userPassword
    },
        {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json' 
            }, })
    var data = response.data
    setEditMsg("You have successfully updated your details")
  } catch(e) {
    setEditMsg(e.response.error)
  }
  }
  function backtoInfo() {
    setEditMode(false);
  }
  function handleEditInfo() {
    setEditMode(true);
  }


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
                          <h2>Welcome back, {customerData.first_name}!<br/><br/></h2>
                          {!editMode ? (
                  <>
                          <button className="btn btn-outline-secondary btn-sm" type="submit" onClick={handleEditInfo}>Update your information here</button>
                          <Link to='/products'><p>View your previous orders here</p></Link>
                          <p>Profile information:</p>
                          <ul>
                              <li>First Name: {customerData.first_name}</li>
                              <li>Last Name: {customerData.last_name}</li>
                              <li>Address: {customerData.address}</li>
                              <li>Phone Number: {customerData.phone_number}</li>
                              <li>Email: {customerData.email_address}</li>
                          </ul>
                          </>
                          ):(
                          <div className="row">
                            <form className="contactFormBorder">
                              <h6>Update your details below</h6>
                              <input value={userfName} type="text" className="form-control" placeholder="First Name" onChange={handleFName}/><br/>
                              <input value={userlName} type="text" className="form-control" placeholder="Last Name" onChange={handleLName}/><br/>
                              <input value={userAddress} type="text" className="form-control" placeholder="Address" onChange={handleAddress}/><br/>
                              <input value={userPhone} type="text" className="form-control" placeholder="Phone Number" onChange={handlePhone}/><br/>
                              <input value={userPassword} type="text" className="form-control" placeholder="Password" onChange={handlePassword}/><br/>
                              <button className="btn btn-outline-secondary btn-sm" onClick={handleupdateInfo}>Update</button>
                             <button className="btn btn-outline-secondary btn-sm" onClick={backtoInfo}>Back to your account</button>
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


