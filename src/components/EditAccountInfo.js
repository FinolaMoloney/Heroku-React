import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './SignUp.css';
import NourishAndSproutLogo from '../images/home/NourishAndSproutLogo.jpg';

function EditAccountInfo({ id }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userID, setUserID] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [customerData, setCustomerData] = useState(null);
  const [userfName, setUserFName] = useState("");
  const [userlName, setUserLName] = useState("");
  const [userAddress, setAddress] = useState("");
  const [userPhone, setPhone] = useState();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [editMsg, setEditMsg] = useState([]);

  useEffect(() =>
  async function () {
      const response = await axios.get(`http://127.0.0.1:4000/customers/${id}`)
      const user = response.data; 
      setUserID(user.id);
      setUserFName(user.userfName);
      setUserLName(user.userlName);
      setAddress(user.userAddress);
      setPhone(user.userPhone);
      setUserPassword(user.userPassword);
    }, [])
  
  function handleId(e) {
    e.preventDefault();
    setUserID(e.target.value)
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
      
  async function handleSubmit(e) {
    e.preventDefault();
    try {
    var response = await axios.put(`http://127.0.0.1:4000/customers/${id}`,
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

  return (
    <div className="background">
      <div className="row banner">
        <h3>Your Account</h3>
      </div>     
      <div className="container-fluid">
        <div className="row">
        <h6>Update your info below</h6>
                <form className="contactFormBorder">
                    <input value={userfName} type="text" className="form-control" placeholder="First Name" onChange={handleFName}/><br/>
                    <button className="btn btn-outline-secondary btn-sm" onClick={handleSubmit}>Edit</button><a href="/" className="btn btn-outline-secondary btn-sm">Back to Articles</a>
                    <p>{editMsg}</p>
                </form>
        </div>
      </div>
    </div>
  );
}

export default EditAccountInfo;


