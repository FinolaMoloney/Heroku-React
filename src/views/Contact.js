import { useForm } from "react-hook-form";
import { useState } from 'react';
import '../components/Contact.css';
import NourishAndSproutLinkedinLogo from '../images/contact/NourishAndSproutLinkedinLogo.png';
import NourishAndSproutInstagramLogo from '../images/contact/NourishAndSproutInstagramLogo.png';

function Contact() {
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
            <h3>CONTACT US</h3>
          </div>
          <div className="container">
            <div className="contact-form">
              {formSubmitted ? (
                <div className="row">
                  <p>Thanks for getting in touch {userfName}, we will get back to you on {userEmail} shortly!</p>
                </div>
              ) : (
                <form className="contactFormBorder" onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <p>If you would like to get in touch, please send us a message below. We would love to hear from you!</p>
                  </div>
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
                    <textarea 
                      type="text" 
                      className="form-control"
                      placeholder="Type your message here" 
                      {...register("message" , { required: "Enter your message before submitting" })} rows="5" cols="40"  />
                    {errors.message && (<small>{errors.message.message}</small>)}
                  </div>
                  <br></br>
                  <button className="btn btn-outline-secondary btn-sm" type="submit">Submit</button>
                </form>
                )}
              
              <div className="row">
                <h6><br />Contact Details</h6>
                  <p><br />
                  Phone: +1221 345 7896<br/>
                  Email: contact@nourishandsprout.com<br/>
                  Address: 04 Patrick Street,<br/>Cork City,<br/>Ireland.
                  </p>
                <h6>Find us on our socials!</h6>
                <div><br /><a href="https://www.linkedin.com/in/finolamoloney/"><img className="logos" src={NourishAndSproutLinkedinLogo} alt="LinkedIn Logo" /></a>
                <a href="https://www.instagram.com"><img className="logos" src={NourishAndSproutInstagramLogo} alt="Instagram Logo" /></a>
                </div>
              </div>
              </div>
          </div>
        </div>
      );
    }
  
  export default Contact;