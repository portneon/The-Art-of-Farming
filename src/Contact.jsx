import React, { useState } from "react";
import "./ContactForm.css";


const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }))
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Sending message:", formData);
    setFormData({ name: "", email: "", message: "" })
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 3000)
  };

  return (
    <>
    <div className="outer-wrapper">
      <div className="form-wrapper">
        <h2 className="heading">Contact Us</h2>
        {submitted && <p className="success-message">Your reply has been sent!</p>}
        <form onSubmit={handleSubmit} className="form-style">
          <input
            type="text"
            name="name"
            placeholder="Your First Name"
            value={formData.name}
            onChange={handleChange}
            className="input-style"
            required
                  />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="input-style"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="input-style textarea-style"
            required
          />
          <button type="submit" className="button-style">
            Send
          </button>
        </form>
      </div>
     
    </div>
      
      </>
  );
};

export default ContactForm;
