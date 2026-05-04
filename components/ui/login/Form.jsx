"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

const LoginForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.success("This is a alreat...~~");
    console.log(form);
  };

  return (
    <div className="contact-inner-section " style={{ padding: "80px 0" }}>
      <div className="container">
        <div className="row align-items-center">
          {/* Left Side: Modern Vector/Illustration */}
          <div className="col-lg-6 d-none d-lg-block">
            <div className="login-vector-area text-center">
              <img
                src="/icons/login-vector.png"
                alt="Login Illustration"
                className="img-fluid"
                style={{ maxWidth: "80%" }}
              />
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="col-lg-5 offset-lg-1">
            <div className="contact-form-area">
              <div className="section-title mb-4">
                <h4>Welcome Back!</h4>
                <p>Please login to your account</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="input-area mb-3">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="input-area mb-3">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="input-area">
                      <button type="submit" className="theme-btn1 w-100">
                        Sign in
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

                  {/* Social Login Divider */}
                  <div className="col-lg-12 text-center mt-4">
                    <div
                      className="social-divider"
                      style={{
                        position: "relative",
                        borderBottom: "1px solid #eee",
                        marginBottom: "25px",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          top: "-12px",
                          background: "#fff",
                          padding: "0 15px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          fontSize: "14px",
                          color: "#777",
                        }}
                      >
                        Or Login With
                      </span>
                    </div>

                    <div className="social-login-icons d-flex justify-content-center gap-3">
                      {/* Google Icon */}
                      <button
                        type="button"
                        className="btn btn-outline-light border shadow-sm p-2"
                        style={{ borderRadius: "10px", width: "60px" }}
                      >
                        <img src="/icons/github.webp" alt="GitHub" width="26" />
                      </button>

                      {/* GitHub Icon */}
                      <button
                        type="button"
                        className="btn btn-outline-light border shadow-sm p-2"
                        style={{ borderRadius: "10px", width: "60px" }}
                      >
                        <img
                          src="/icons/google-icon-logo.svg"
                          alt="GitHub"
                          width="24"
                        />
                      </button>
                      {/* GitHub Icon */}
                      <button
                        type="button"
                        className="btn btn-outline-light border shadow-sm p-2"
                        style={{ borderRadius: "10px", width: "60px" }}
                      >
                        <img src="/icons/linkdin.png" alt="GitHub" width="20" />
                      </button>
                    </div>
                  </div>

                  <div className="col-lg-12 text-center mt-4">
                    <p>
                      Don’t have an account?{" "}
                      <a
                        href="/register"
                        className="fw-bold"
                        style={{ color: "var(--theme-color-1)" }}
                      >
                        Create Account
                      </a>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* End Right Side */}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
