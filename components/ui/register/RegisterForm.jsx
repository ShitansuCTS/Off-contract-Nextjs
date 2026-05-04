"use client";

import React, { useState, useEffect } from "react";

const RegisterForm = () => {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "supplier",
    companyName: "",
    gst: "",
    category: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const nextStep = (e) => {
    e.preventDefault();
    setStep(2);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Call backend to create order
    const res = await fetch("/api/v1/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    // 2. Razorpay options
    const options = {
      key: "rzp_test_SkUslFnhz3VWaz",
      amount: data.amount, // MUST be same as backend
      currency: data.currency || "INR",
      name: "Your Company",
      description: "Registration Payment",
      order_id: data.orderId,

      handler: function (response) {
        console.log("SUCCESS:", response);
        window.location.href = "/success";
      },

      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },

      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="contact-inner-section" style={{ padding: "80px 0" }}>
      <div className="container">
        <div className="row align-items-center">
          {/* LEFT SIDE SAME */}
          <div className="col-lg-6 d-none d-lg-block">
            <div className="login-vector-area text-center">
              <img
                src="/icons/register.png"
                alt="Register Illustration"
                className="img-fluid"
                style={{ maxWidth: "100%" }}
              />
            </div>
          </div>

          {/* RIGHT SIDE SAME STRUCTURE */}
          <div className="col-lg-5 offset-lg-1">
            <div className="contact-form-area">
              <div className="section-title mb-4">
                <h4>Register Now</h4>
                <p>Create your account</p>
              </div>

              {/* STEP 1 */}
              {step === 1 && (
                <form onSubmit={nextStep}>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="input-area ">
                        <input
                          type="text"
                          name="name"
                          placeholder="Full Name"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="input-area ">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="input-area mb-4">
                        <input
                          type="text"
                          name="phone"
                          placeholder="Phone Number"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="input-area ">
                        <select
                          name="type"
                          onChange={handleChange}
                          className="form-control"
                          style={{ padding: "10px 15px" }}
                        >
                          <option value="supplier">Supplier</option>
                          <option value="agency">Agency</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="input-area">
                        <button type="submit" className="theme-btn1 w-100">
                          Proceed to Next
                          <span className="arrow1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width={24}
                              height={24}
                              fill="currentColor"
                            >
                              <path d="M12 13H4V11H12V4L20 12L12 20V13Z" />
                            </svg>
                          </span>
                          <span className="arrow2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width={24}
                              height={24}
                              fill="currentColor"
                            >
                              <path d="M12 13H4V11H12V4L20 12L12 20V13Z" />
                            </svg>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="input-area ">
                        <input
                          type="text"
                          name="companyName"
                          placeholder="Company Name"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="input-area ">
                        <input
                          type="text"
                          name="gst"
                          placeholder="GST Number"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="input-area ">
                        <input
                          type="text"
                          name="category"
                          placeholder="Business Category"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="input-area">
                        <button type="submit" className="theme-btn1 w-100">
                          Proceed to Payment
                          <span className="arrow1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width={24}
                              height={24}
                              fill="currentColor"
                            >
                              <path d="M12 13H4V11H12V4L20 12L12 20V13Z" />
                            </svg>
                          </span>
                          <span className="arrow2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width={24}
                              height={24}
                              fill="currentColor"
                            >
                              <path d="M12 13H4V11H12V4L20 12L12 20V13Z" />
                            </svg>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {/* STEP 3 SUCCESS */}
              {step === 3 && (
                <div className="text-center">
                  <h4>🎉 Registration Successful</h4>
                  <p>Your account has been created successfully.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
