"use client";
import Slider from "react-slick";

import Layout from "@/components/layout/Layout";
import Link from "next/link";
import CounterUp from "@/components/elements/CounterUp";
import Cta from "../cta/Cta";
export default function AboutPageUi() {
  const settings2 = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    centerMode: false,
    focusOnSelect: true,
    fade: true,
    loop: true,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const settings1 = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    loop: true,
    focusOnSelect: true,
    infinite: true,
  };
  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <div>
          <div className="hero-inner-section-area-sidebar">
            <img
              src="/assets/img/all-images/hero/hero-img1.png"
              alt="Of Contractors"
              className="hero-img1"
            />
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="hero-header-area text-center">
                    <Link href="/">
                      Home{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
                      </svg>{" "}
                      About Us
                    </Link>
                    <div className="space24" />
                    <h1>About Us</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*===== HERO AREA ENDS =======*/}

          {/*===== ABOUT AREA STARTS =======*/}
          <div className="about1-section-area sp1">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="about-images-area">
                    {/* <div className="img2 image-anime reveal">
                      <img
                        src="/assets/img/all-images/about/1.jpg"
                        alt="Of Contractors"
                      />
                    </div> */}
                    <div className="img1 image-anime reveal">
                      <img
                        src="/assets/img/all-images/about/1.jpg"
                        alt="Of Contractors"
                      />
                    </div>
                    {/* <div className="author-img aniamtion-key-1">
                      <h3>Our Happy Customer</h3>
                      <div className="space18" />
                      <img
                        src="/assets/img/all-images/others/author-img1.png"
                        alt="Of Contractors"
                      />
                    </div> */}
                  </div>
                </div>
                <div className="col-lg-1" />
                <div className="col-lg-5">
                  <div className="about-heading heading1">
                    <h5 data-aos="fade-left" data-aos-duration={800}>
                      About OfContractors
                    </h5>
                    <div className="space20" />
                    <h2 className="text-anime-style-3">
                      {" "}
                      Trusted Contractors for Every Business
                    </h2>
                    <div className="space18" />
                    <p
                      data-aos="fade-left"
                      data-aos-duration={900}
                      style={{ textAlign: "justify" }}
                    >
                      At OfContractors, we help businesses connect with reliable
                      contractors, skilled professionals, and trusted service
                      providers. Our platform simplifies project collaboration,
                      making it easier to find the right expertise, grow
                      business networks, and complete projects with confidence.
                    </p>
                    <div className="space32" />
                    <div
                      className="counter-boxes"
                      data-aos="fade-left"
                      data-aos-duration={1000}
                    >
                      <div className="row">
                        <div className="col-lg-4 col-md-4 col-6">
                          <div className="counter-boxarea text-center">
                            <h2>
                              <CounterUp className="counter">10</CounterUp>K
                            </h2>
                            <div className="space12" />
                            <p>Homes Sold</p>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-6">
                          <div className="counter-boxarea text-center">
                            <h2>
                              <CounterUp className="counter">9</CounterUp>K
                            </h2>
                            <div className="space12" />
                            <p>Happy Client</p>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-6">
                          <div className="space20 d-md-none d-block" />
                          <div className="counter-boxarea text-center">
                            <h2>
                              <CounterUp className="counter">98</CounterUp>%
                            </h2>
                            <div className="space12" />
                            <p>Satisfaction Rate</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space32" />
                    <div
                      className="btn-area1"
                      data-aos="fade-left"
                      data-aos-duration={1100}
                    >
                      <Link
                        href="/property-halfmap-grid"
                        className="theme-btn1"
                        style={{ marginRight: "10px" }}
                      >
                        All Listings{" "}
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
                      </Link>
                      <Link href="/contact-us" className="theme-btn1">
                        Get In Touch{" "}
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
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*===== ABOUT AREA ENDS =======*/}
          {/*===== OTHERS AREA STARTS =======*/}
          <div
            className="mission-section-area sp1"
            style={{
              backgroundImage: "url(assets/img/all-images/bg/bg1.png)",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-6 m-auto">
                  <div className="heading1 text-center space-margin60">
                    <h5>Our Mission</h5>
                    <div className="space20" />
                    <h2>Our Mission &amp; Vision</h2>
                  </div>
                  <div className="space100 d-lg-block d-none" />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-7">
                  <div className="vission-mission-box">
                    <h3>Trusted Contractor Solutions</h3>

                    <div className="space24" />

                    <p>
                      OfContractors connects businesses with reliable
                      contractors, construction services, and equipment
                      providers for every project need.
                    </p>

                    <div className="space24" />

                    <h4>Our Mission</h4>

                    <div className="space16" />

                    <p>
                      To deliver trusted construction solutions and build strong
                      business partnerships.
                    </p>

                    <div className="space24" />

                    <h4>Our Vision</h4>

                    <div className="space16" />

                    <p>
                      To become a leading platform for contractors, construction
                      services, and industry support.
                    </p>

                    <div className="space32" />

                    <div className="btn-area1">
                      <Link href="/services" className="theme-btn1">
                        Explore Services{" "}
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
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="img1">
                    <img
                      src="/assets/img/all-images/about/4.jpg"
                      alt="Of Contractors"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*===== OTHERS AREA ENDS =======*/}

          {/*===== TEAM AREA STARTS =======*/}
          <div className="team1-section-area sp2">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 m-auto">
                  <div className="team-header heading1 space-margin60 text-center">
                    <h5 data-aos="fade-left" data-aos-duration={800}>
                      Experts Behind Of Contractors
                    </h5>
                    <div className="space20" />
                    <h2 className="text-anime-style-3">
                      The Of Contractors Dream Team
                    </h2>
                  </div>
                </div>
              </div>
              <div className="row">
                <div
                  className="col-lg-3 col-md-6"
                  data-aos="zoom-out"
                  data-aos-duration={800}
                >
                  <div className="team-widget-boxarea">
                    <div className="img1 image-anime">
                      <img
                        src="/assets/img/all-images/team/team-img1.png"
                        alt="Of Contractors"
                      />
                      <div className="share">
                        <Link href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={17}
                            height={18}
                            viewBox="0 0 17 18"
                            fill="none"
                          >
                            <path
                              d="M14.1333 12.7229C13.4578 12.7229 12.8533 12.994 12.3911 13.4187L6.05332 9.66867C6.09777 9.46084 6.13332 9.25301 6.13332 9.03614C6.13332 8.81928 6.09777 8.61145 6.05332 8.40361L12.32 4.68976C12.8 5.14157 13.4311 5.42169 14.1333 5.42169C15.6089 5.42169 16.8 4.21084 16.8 2.71084C16.8 1.21084 15.6089 0 14.1333 0C12.6578 0 11.4667 1.21084 11.4667 2.71084C11.4667 2.92771 11.5022 3.13554 11.5467 3.34337L5.27999 7.05723C4.79999 6.60542 4.16888 6.3253 3.46665 6.3253C1.9911 6.3253 0.799988 7.53614 0.799988 9.03614C0.799988 10.5361 1.9911 11.747 3.46665 11.747C4.16888 11.747 4.79999 11.4669 5.27999 11.0151L11.6089 14.7741C11.5644 14.9639 11.5378 15.1627 11.5378 15.3614C11.5378 16.8163 12.7022 18 14.1333 18C15.5644 18 16.7289 16.8163 16.7289 15.3614C16.7289 13.9066 15.5644 12.7229 14.1333 12.7229Z"
                              fill="white"
                            />
                          </svg>
                        </Link>
                      </div>
                      <ul>
                        <li>
                          <Link href="#">
                            <i className="fa-brands fa-facebook-f" />
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <i className="fa-brands fa-linkedin-in" />
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="m-0">
                            <i className="fa-brands fa-instagram" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="space24" />
                    <div className="content-area">
                      <Link href="#">Henry Nicolas</Link>
                      <div className="space14" />
                      <p>Founder &amp; CEO</p>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-3 col-md-6"
                  data-aos="zoom-out"
                  data-aos-duration={900}
                >
                  <div className="team-widget-boxarea">
                    <div className="img1 image-anime">
                      <img
                        src="/assets/img/all-images/team/team-img2.png"
                        alt="Of Contractors"
                      />
                      <div className="share">
                        <Link href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={17}
                            height={18}
                            viewBox="0 0 17 18"
                            fill="none"
                          >
                            <path
                              d="M14.1333 12.7229C13.4578 12.7229 12.8533 12.994 12.3911 13.4187L6.05332 9.66867C6.09777 9.46084 6.13332 9.25301 6.13332 9.03614C6.13332 8.81928 6.09777 8.61145 6.05332 8.40361L12.32 4.68976C12.8 5.14157 13.4311 5.42169 14.1333 5.42169C15.6089 5.42169 16.8 4.21084 16.8 2.71084C16.8 1.21084 15.6089 0 14.1333 0C12.6578 0 11.4667 1.21084 11.4667 2.71084C11.4667 2.92771 11.5022 3.13554 11.5467 3.34337L5.27999 7.05723C4.79999 6.60542 4.16888 6.3253 3.46665 6.3253C1.9911 6.3253 0.799988 7.53614 0.799988 9.03614C0.799988 10.5361 1.9911 11.747 3.46665 11.747C4.16888 11.747 4.79999 11.4669 5.27999 11.0151L11.6089 14.7741C11.5644 14.9639 11.5378 15.1627 11.5378 15.3614C11.5378 16.8163 12.7022 18 14.1333 18C15.5644 18 16.7289 16.8163 16.7289 15.3614C16.7289 13.9066 15.5644 12.7229 14.1333 12.7229Z"
                              fill="white"
                            />
                          </svg>
                        </Link>
                      </div>
                      <ul>
                        <li>
                          <Link href="#">
                            <i className="fa-brands fa-facebook-f" />
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <i className="fa-brands fa-linkedin-in" />
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="m-0">
                            <i className="fa-brands fa-instagram" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="space24" />
                    <div className="content-area">
                      <Link href="#">Sarah Johnson</Link>
                      <div className="space14" />
                      <p>Real Estate Agent</p>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-3 col-md-6"
                  data-aos="zoom-out"
                  data-aos-duration={1000}
                >
                  <div className="team-widget-boxarea">
                    <div className="img1 image-anime">
                      <img
                        src="/assets/img/all-images/team/team-img3.png"
                        alt="Of Contractors"
                      />
                      <div className="share">
                        <Link href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={17}
                            height={18}
                            viewBox="0 0 17 18"
                            fill="none"
                          >
                            <path
                              d="M14.1333 12.7229C13.4578 12.7229 12.8533 12.994 12.3911 13.4187L6.05332 9.66867C6.09777 9.46084 6.13332 9.25301 6.13332 9.03614C6.13332 8.81928 6.09777 8.61145 6.05332 8.40361L12.32 4.68976C12.8 5.14157 13.4311 5.42169 14.1333 5.42169C15.6089 5.42169 16.8 4.21084 16.8 2.71084C16.8 1.21084 15.6089 0 14.1333 0C12.6578 0 11.4667 1.21084 11.4667 2.71084C11.4667 2.92771 11.5022 3.13554 11.5467 3.34337L5.27999 7.05723C4.79999 6.60542 4.16888 6.3253 3.46665 6.3253C1.9911 6.3253 0.799988 7.53614 0.799988 9.03614C0.799988 10.5361 1.9911 11.747 3.46665 11.747C4.16888 11.747 4.79999 11.4669 5.27999 11.0151L11.6089 14.7741C11.5644 14.9639 11.5378 15.1627 11.5378 15.3614C11.5378 16.8163 12.7022 18 14.1333 18C15.5644 18 16.7289 16.8163 16.7289 15.3614C16.7289 13.9066 15.5644 12.7229 14.1333 12.7229Z"
                              fill="white"
                            />
                          </svg>
                        </Link>
                      </div>
                      <ul>
                        <li>
                          <Link href="#">
                            <i className="fa-brands fa-facebook-f" />
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <i className="fa-brands fa-linkedin-in" />
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="m-0">
                            <i className="fa-brands fa-instagram" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="space24" />
                    <div className="content-area">
                      <Link href="#">Sohia Rodriguez</Link>
                      <div className="space14" />
                      <p>Marketing Director</p>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-3 col-md-6"
                  data-aos="zoom-out"
                  data-aos-duration={1200}
                >
                  <div className="team-widget-boxarea">
                    <div className="img1 image-anime">
                      <img
                        src="/assets/img/all-images/team/team-img4.png"
                        alt="Of Contractors"
                      />
                      <div className="share">
                        <Link href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={17}
                            height={18}
                            viewBox="0 0 17 18"
                            fill="none"
                          >
                            <path
                              d="M14.1333 12.7229C13.4578 12.7229 12.8533 12.994 12.3911 13.4187L6.05332 9.66867C6.09777 9.46084 6.13332 9.25301 6.13332 9.03614C6.13332 8.81928 6.09777 8.61145 6.05332 8.40361L12.32 4.68976C12.8 5.14157 13.4311 5.42169 14.1333 5.42169C15.6089 5.42169 16.8 4.21084 16.8 2.71084C16.8 1.21084 15.6089 0 14.1333 0C12.6578 0 11.4667 1.21084 11.4667 2.71084C11.4667 2.92771 11.5022 3.13554 11.5467 3.34337L5.27999 7.05723C4.79999 6.60542 4.16888 6.3253 3.46665 6.3253C1.9911 6.3253 0.799988 7.53614 0.799988 9.03614C0.799988 10.5361 1.9911 11.747 3.46665 11.747C4.16888 11.747 4.79999 11.4669 5.27999 11.0151L11.6089 14.7741C11.5644 14.9639 11.5378 15.1627 11.5378 15.3614C11.5378 16.8163 12.7022 18 14.1333 18C15.5644 18 16.7289 16.8163 16.7289 15.3614C16.7289 13.9066 15.5644 12.7229 14.1333 12.7229Z"
                              fill="white"
                            />
                          </svg>
                        </Link>
                      </div>
                      <ul>
                        <li>
                          <Link href="#">
                            <i className="fa-brands fa-facebook-f" />
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <i className="fa-brands fa-linkedin-in" />
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="m-0">
                            <i className="fa-brands fa-instagram" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="space24" />
                    <div className="content-area">
                      <Link href="#">Daniel Williams</Link>
                      <div className="space14" />
                      <p>Services Manager</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*===== TEAM AREA ENDS =======*/}

          {/*===== TESTIMONIAL AREA STARTS =======*/}
          <div
            className="testimonial1-section-area sp1"
            style={{
              backgroundImage: "url(assets/img/all-images/bg/bg1.png)",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="testimonial-header space-margin60 heading1">
                    <h5 data-aos="fade-left" data-aos-duration={800}>
                      feedback/testimonial
                    </h5>
                    <div className="space20" />
                    <h2 className="text-anime-style-3">
                      A Legacy Of Happy Clients
                    </h2>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="testimonialmain-slider">
                    <div className="row align-items-center">
                      <div className="col-lg-5">
                        <Slider {...settings2} className="images-area2 slider2">
                          <div className="img1 image-anime">
                            <img
                              src="/assets/img/all-images/about/7.jpg"
                              alt="Of Contractors"
                            />
                          </div>
                          <div className="img1 image-anime">
                            <img
                              src="/assets/img/all-images/about/8.jpg"
                              alt="Of Contractors"
                            />
                          </div>
                          <div className="img1 image-anime">
                            <img
                              src="/assets/img/all-images/about/9.jpg"
                              alt="Of Contractors"
                            />
                          </div>
                          <div className="img1 image-anime">
                            <img
                              src="/assets/img/all-images/about/10.jpg"
                              alt="Of Contractors"
                            />
                          </div>
                        </Slider>
                      </div>
                      <div className="col-lg-7">
                        <Slider
                          {...settings1}
                          className="testimonial-slider-area slider1"
                        >
                          <div className="testimonial-box">
                            <img
                              src="/assets/img/icons/quoto-icon1.svg"
                              alt="Of Contractors"
                            />

                            <div className="space16" />

                            <p>
                              "OfContractors helped us find reliable
                              construction materials and skilled contractors for
                              our commercial project. The entire process was
                              smooth, professional, and completed on time."
                            </p>

                            <div className="space32" />

                            <div className="test-images">
                              <div className="auhtor-area">
                                <div className="img1">
                                  <img
                                    src="/assets/img/all-images/testimonial/testimonial-img2.png"
                                    alt="Of Contractors"
                                  />
                                </div>

                                <div className="text">
                                  <Link href="#">Rahul Sharma</Link>
                                  <div className="space10" />
                                  <p>Business Owner</p>
                                </div>
                              </div>

                              <img
                                src="/assets/img/elements/brand1.png"
                                alt="Of Contractors"
                                className="brand1"
                              />
                            </div>
                          </div>

                          <div className="testimonial-box">
                            <img
                              src="/assets/img/icons/quoto-icon1.svg"
                              alt="Of Contractors"
                            />

                            <div className="space16" />

                            <p>
                              "We rented construction equipment through
                              OfContractors and received excellent support
                              throughout the project. Their service saved both
                              time and operational costs."
                            </p>

                            <div className="space32" />

                            <div className="test-images">
                              <div className="auhtor-area">
                                <div className="img1">
                                  <img
                                    src="/assets/img/all-images/testimonial/testimonial-img2.png"
                                    alt="Of Contractors"
                                  />
                                </div>

                                <div className="text">
                                  <Link href="#">Amit Patel</Link>
                                  <div className="space10" />
                                  <p>Project Manager</p>
                                </div>
                              </div>

                              <img
                                src="/assets/img/elements/brand1.png"
                                alt="Of Contractors"
                                className="brand1"
                              />
                            </div>
                          </div>

                          <div className="testimonial-box">
                            <img
                              src="/assets/img/icons/quoto-icon1.svg"
                              alt="Of Contractors"
                            />

                            <div className="space16" />

                            <p>
                              "Their contractor network is highly professional
                              and reliable. OfContractors helped us complete our
                              residential construction work efficiently and
                              within budget."
                            </p>

                            <div className="space32" />

                            <div className="test-images">
                              <div className="auhtor-area">
                                <div className="img1">
                                  <img
                                    src="/assets/img/all-images/testimonial/testimonial-img2.png"
                                    alt="Of Contractors"
                                  />
                                </div>

                                <div className="text">
                                  <Link href="#">Priya Verma</Link>
                                  <div className="space10" />
                                  <p>Homeowner</p>
                                </div>
                              </div>

                              <img
                                src="/assets/img/elements/brand1.png"
                                alt="Of Contractors"
                                className="brand1"
                              />
                            </div>
                          </div>

                          <div className="testimonial-box">
                            <img
                              src="/assets/img/icons/quoto-icon1.svg"
                              alt="Of Contractors"
                            />

                            <div className="space16" />

                            <p>
                              "OfContractors provided quick assistance for our
                              worker insurance and construction support needs.
                              Their team was responsive and easy to work with."
                            </p>

                            <div className="space32" />

                            <div className="test-images">
                              <div className="auhtor-area">
                                <div className="img1">
                                  <img
                                    src="/assets/img/all-images/testimonial/testimonial-img2.png"
                                    alt="Of Contractors"
                                  />
                                </div>

                                <div className="text">
                                  <Link href="#">Sandeep Kumar</Link>
                                  <div className="space10" />
                                  <p>Contractor</p>
                                </div>
                              </div>

                              <img
                                src="/assets/img/elements/brand1.png"
                                alt="Of Contractors"
                                className="brand1"
                              />
                            </div>
                          </div>
                        </Slider>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*===== TESTIMONIAL AREA ENDS =======*/}

          {/*===== ABOUT AREA STARTS =======*/}
          <div className="about2-section-area sp1">
            <div className="container">
              <div className="row align-items-start">
                {/* Left Side */}
                <div className="col-lg-6">
                  <div className="about-heading heading1">
                    <h5 data-aos="fade-left" data-aos-duration={800}>
                      FAQ'S
                    </h5>

                    <div className="space20" />

                    <h2 className="text-anime-style-3">
                      Frequently Asked Questions
                    </h2>

                    <div className="space18" />

                    <p data-aos="fade-left" data-aos-duration={900}>
                      Find answers to common questions about our contractor
                      services, construction materials, equipment rentals, and
                      project support solutions.
                    </p>

                    <div className="accordion" id="accordionLeft">
                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="false"
                            aria-controls="collapseOne"
                          >
                            What services does OfContractors provide?
                          </button>
                        </h2>

                        <div
                          id="collapseOne"
                          className="accordion-collapse collapse "
                          data-bs-parent="#accordionLeft"
                        >
                          <div className="accordion-body">
                            <p>
                              We provide contractor services, construction
                              materials, equipment rentals, and project support
                              solutions.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                          >
                            Do you Ofer construction equipment rentals?
                          </button>
                        </h2>

                        <div
                          id="collapseTwo"
                          className="accordion-collapse collapse"
                          data-bs-parent="#accordionLeft"
                        >
                          <div className="accordion-body">
                            <p>
                              Yes, we provide rental solutions for cranes,
                              mixers, excavators, and other construction
                              equipment.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                          >
                            Can I request construction materials online?
                          </button>
                        </h2>

                        <div
                          id="collapseThree"
                          className="accordion-collapse collapse"
                          data-bs-parent="#accordionLeft"
                        >
                          <div className="accordion-body">
                            <p>
                              Yes, you can explore materials, check
                              specifications, and submit inquiry requests
                              directly through our platform.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right Side */}
                <div className="col-lg-6">
                  <div className="img1">
                    <img
                      src="/assets/img/all-images/about/6.jpg"
                      alt="Of Contractors"
                      style={{ borderRadius: "8px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*===== ABOUT AREA ENDS =======*/}

          <div className="space100 d-lg-block d-none" />
          <div className="space50 d-lg-none d-block" />
          {/*===== CTA AREA STARTS =======*/}
          <Cta />
        </div>
      </Layout>
    </>
  );
}
