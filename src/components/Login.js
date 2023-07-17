import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './SignUp.css';
import NourishAndSproutLogo from '../images/home/NourishAndSproutLogo.jpg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [customerData, setCustomerData] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.get(
        'http://127.0.0.1:4000/customers',
        { headers: { Accept: 'application/json' }});

      // Find the customer with matching email and password
      const matchedCustomer = response.data.find (customer => customer.email_address === email && customer.password === password);

      if (matchedCustomer) {
        setLoggedIn(true);
        setCustomerData(matchedCustomer);
      } else {
        return('Login failed!');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }

  return (
    <div className="background">
      <div className="row banner">
        <h3>LOG IN HERE</h3>
      </div>      
        <div className="container">
            <div className="row">
                <div className="col-sm-6">
                    <h3>LOG IN BELOW</h3>
                    <br/>
                    {!loggedIn ? (
                        <Form className="contactFormBorder"onSubmit={handleSubmit}>
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
                        <div>
                            <h2>Welcome, {customerData.first_name}!</h2>
                            <p>Here is your profile information:</p>
                            <ul>
                                <li>First Name: {customerData.first_name}</li>
                                <li>Last Name: {customerData.last_name}</li>
                                <li>Address: {customerData.address}</li>
                                <li>Phone Number: {customerData.phone_number}</li>
                                <li>Email: {customerData.email_address}</li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className="col-sm-6">
                    <img className="smallLogo" src={NourishAndSproutLogo} alt="NourishAndSproutLogo" />
                </div>
            </div>
        </div>
    </div>
  );
}

export default Login;


