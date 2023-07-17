import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/Contact.css';
import NourishAndSproutLogo from '../images/home/NourishAndSproutLogo.jpg';

function Signup() {
    const { register, handleSubmit, formState: { errors },  watch } = useForm();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [userfName, setUserFName] = useState("");
    const [userlName, setUserLName] = useState("");
    const [userAddress, setAddress] = useState("");
    const [userPhone, setPhone] = useState();
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
  
    useEffect(() => {
        async function createUser() {
          try {
            const response = await axios.post(
              "http://localhost:4000/customers",
              {
                first_name: userfName,
                last_name: userlName,
                address: userAddress,
                phone_number: userPhone,
                email_address: userEmail,
                password: userPassword
              },
              { headers: { Accept: "application/json" } }
            );
            console.log("Customer created:", response.data);
          } catch (error) {
            console.error(error);
          }
        }
    
        if (formSubmitted) {
          createUser();
        }
      }, [formSubmitted, userfName, userlName, userAddress, userPhone, userEmail, userPassword]);
    
      const password = watch('password');
      const confirmPassword = watch('confirmPassword');
    
      const onSubmit = (data, e) => {
        e.preventDefault();
        setFormSubmitted(true);
        setUserFName(data.name);
        setUserLName(data.lastName);
        setAddress(data.address);
        setPhone(data.phoneNumber);
        setUserEmail(data.email);
        setUserPassword(data.password);
      };
  
      return (
        <div className="background">
            <div className="row banner">
                <h3>SIGN UP HERE</h3>
            </div> 
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <h3>SIGN UP BELOW</h3>
                        {formSubmitted ? (
                            <div className="contactFormBorder">
                                <p>{userfName}, you have successfully signed up!</p>
                            </div>
                            ) : (
                            <form className="contactFormBorder" onSubmit={handleSubmit(onSubmit)}>
                                <p>Please fill in all fields below before submitting.</p>
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
                                    type="text" 
                                    className="form-control"
                                    placeholder="Address" 
                                    {...register("address", { required: "Address is required" })} />
                                    {errors.address && (<small>{errors.address.message}</small>)}
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
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        {...register('password', { required: 'Password is required' })}
                                    />
                                    {errors.password && <small>{errors.password.message}</small>}
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Confirm Password"
                                        {...register('confirmPassword', {
                                        required: 'Confirm Password is required',
                                        validate: (value) => value === password || 'Passwords do not match',
                                        })}
                                    />
                                    {errors.confirmPassword && <small>{errors.confirmPassword.message}</small>}
                                    </div>
                                    <br/>
                                <button className="btn btn-outline-secondary btn-sm" type="submit">Submit</button>
                            </form>
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
export default Signup;