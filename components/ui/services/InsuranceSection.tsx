"use client";

import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const swiperFade = {
  modules: [Autoplay, Pagination, Navigation],
  spaceBetween: 0,
  slidesPerView: 1,
  freeMode: true,
  watchSlidesProgress: true,
  autoplay: {
    delay: 2500,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
};
export default function InsuranceSection() {
  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <div>
          <div className="hero-inner-section-area-sidebar">
            <img
              src="/assets/img/all-images/hero/hero-img1.png"
              alt="housebox"
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
                        <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z" />
                      </svg>{" "}
                      Listing{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z" />
                      </svg>{" "}
                      Find Top Map List
                    </Link>
                    <div className="space24" />
                    <h1>Find Sidebar List</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*===== HERO AREA ENDS =======*/}

          {/*===== PROPERTIES AREA STARTS =======*/}
          <div className="property-inner-section-find sp1">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="property-mapgrid-area">
                    <div className="space32 d-none d-lg-block" />

                    <div className="row align-items-center">
                      {/* LEFT SIDE */}
                      <div className="col-lg-8">
                        <div className="property-latest">
                          <span className="title">Insurance Solutions</span>

                          <div className="space16" />

                          <h2>Construction Insurance Services</h2>

                          <div className="space16" />

                          <p>
                            Protect your workforce, projects, and business
                            operations with trusted construction insurance
                            support.
                          </p>

                          <div className="space30" />

                          <div className="row">
                            {/* CARD 1 */}
                            <div className="col-lg-6 col-md-6">
                              <div className="latest-proprty">
                                <div className="img1">
                                  <img
                                    src="/assets/img/icons/shield.svg"
                                    alt="insurance"
                                  />
                                </div>

                                <div className="content">
                                  <Link href="/insurance">
                                    Project Insurance
                                  </Link>

                                  <div className="space8" />

                                  <p>
                                    Risk coverage for ongoing construction
                                    projects.
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* CARD 2 */}
                            <div className="col-lg-6 col-md-6">
                              <div className="latest-proprty">
                                <div className="img1">
                                  <img
                                    src="/assets/img/icons/shield.svg"
                                    alt="insurance"
                                  />
                                </div>

                                <div className="content">
                                  <Link href="/insurance">
                                    Worker Insurance
                                  </Link>

                                  <div className="space8" />

                                  <p>
                                    Protection plans for construction workers.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="space20" />

                            {/* CARD 3 */}
                            <div className="col-lg-6 col-md-6">
                              <div className="latest-proprty">
                                <div className="img1">
                                  <img
                                    src="/assets/img/icons/shield.svg"
                                    alt="insurance"
                                  />
                                </div>

                                <div className="content">
                                  <Link href="/insurance">
                                    Liability Coverage
                                  </Link>

                                  <div className="space8" />

                                  <p>
                                    Legal and third-party liability protection.
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* CARD 4 */}
                            <div className="col-lg-6 col-md-6">
                              <div className="latest-proprty">
                                <div className="img1">
                                  <img
                                    src="/assets/img/icons/shield.svg"
                                    alt="insurance"
                                  />
                                </div>

                                <div className="content">
                                  <Link href="/insurance">
                                    Transit Insurance
                                  </Link>

                                  <div className="space8" />

                                  <p>
                                    Coverage for transported construction
                                    materials.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT SIDE */}
                      <div className="col-lg-4">
                        <div className="contact-form-area">
                          <h4>Get In Touch</h4>
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="input-area">
                                <input type="text" placeholder="First Name" />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="input-area">
                                <input type="text" placeholder="Last Name" />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="input-area">
                                <input
                                  type="email"
                                  placeholder="Email Address"
                                />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="input-area">
                                <input
                                  type="number"
                                  placeholder="Phone Number"
                                />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="input-area">
                                <textarea placeholder="Your Message" />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="input-area">
                                <button type="submit" className="theme-btn1">
                                  Send Now{" "}
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*===== PROPERTIES AREA ENDS =======*/}

          <div className="contact-inner-section sp1">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-7">
                  <div className="property-latest">
                    <span className="title">Insurance Solutions</span>

                    <div className="space16" />

                    <h2>Construction Insurance Services</h2>

                    <div className="space16" />

                    <p>
                      Protect your workforce, projects, and business operations
                      with trusted construction insurance support.
                    </p>

                    <div className="space30" />

                    <div className="row">
                      {/* CARD 1 */}
                      <div className="col-lg-6 col-md-6">
                        <div className="latest-proprty">
                          <div className="img1">
                            <img
                              src="/assets/img/icons/shield.svg"
                              alt="insurance"
                            />
                          </div>

                          <div className="content">
                            <Link href="/insurance">Project Insurance</Link>

                            <div className="space8" />

                            <p>
                              Risk coverage for ongoing construction projects.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* CARD 2 */}
                      <div className="col-lg-6 col-md-6">
                        <div className="latest-proprty">
                          <div className="img1">
                            <img
                              src="/assets/img/icons/shield.svg"
                              alt="insurance"
                            />
                          </div>

                          <div className="content">
                            <Link href="/insurance">Worker Insurance</Link>

                            <div className="space8" />

                            <p>Protection plans for construction workers.</p>
                          </div>
                        </div>
                      </div>

                      <div className="space20" />

                      {/* CARD 3 */}
                      <div className="col-lg-6 col-md-6">
                        <div className="latest-proprty">
                          <div className="img1">
                            <img
                              src="/assets/img/icons/shield.svg"
                              alt="insurance"
                            />
                          </div>

                          <div className="content">
                            <Link href="/insurance">Liability Coverage</Link>

                            <div className="space8" />

                            <p>Legal and third-party liability protection.</p>
                          </div>
                        </div>
                      </div>

                      {/* CARD 4 */}
                      <div className="col-lg-6 col-md-6">
                        <div className="latest-proprty">
                          <div className="img1">
                            <img
                              src="/assets/img/icons/shield.svg"
                              alt="insurance"
                            />
                          </div>

                          <div className="content">
                            <Link href="/insurance">Transit Insurance</Link>

                            <div className="space8" />

                            <p>
                              Coverage for transported construction materials.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-1" />
                <div className="col-lg-5">
                  <div className="contact-form-area">
                    <h4>Get In Touch</h4>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="input-area">
                          <input type="text" placeholder="First Name" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="input-area">
                          <input type="text" placeholder="Last Name" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="input-area">
                          <input type="email" placeholder="Email Address" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="input-area">
                          <input type="number" placeholder="Phone Number" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="input-area">
                          <textarea placeholder="Your Message" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="input-area">
                          <button type="submit" className="theme-btn1">
                            Send Now{" "}
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
