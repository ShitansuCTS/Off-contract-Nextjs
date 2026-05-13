import React from "react";
import Link from "next/link";

const Cta = () => {
  return (
    <div className="cta1-section-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div
              className="cta-bg-area"
              style={{
                backgroundImage: "url(assets/img/all-images/bg/cta-bg1.png)",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <div className="row align-items-center">
                <div className="col-lg-5">
                  <div className="cta-header">
                    <h2
                      className="text-anime-style-3"
                      style={{ fontSize: "34px" }}
                    >
                      Ready to Take Your Business to the Next Level?
                    </h2>
                    <div className="space16" />
                    <p data-aos="fade-left" data-aos-duration={1000}>
                      Join thousands of businesses growing with OfContractor.
                    </p>
                  </div>
                </div>
                <div className="col-lg-2" />
                <div
                  className="col-lg-5"
                  data-aos="zoom-in"
                  data-aos-duration={1000}
                >
                  <div className="btn-area1 text-center">
                    <Link
                      href="/sidebar-grid"
                      className="theme-btn1"
                      style={{ marginRight: "10px" }}
                    >
                      Join as a Supllier{" "}
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
                    <Link href="/sidebar-grid" className="theme-btn1">
                      Join as a Contractor{" "}
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
      </div>
    </div>
  );
};

export default Cta;
