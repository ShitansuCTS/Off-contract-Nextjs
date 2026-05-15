import Link from "next/link";

export default function Project1() {
  return (
    <>
      <div className="project1-section-area sp2">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <div className="project-heading heading1 space-margin60 text-center">
                <h5>Contact Us</h5>
                <div className="space20" />
                <h2 className="text-anime-style-3">Get in touch with Us</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div
              className="col-lg-3 col-md-6"
              data-aos="zoom-in"
              data-aos-duration={800}
            >
              <div
                className="project-featured-box"
                style={{ borderRadius: "5px" }}
              >
                <div className="img1">
                  <img
                    src="/assets/img/all-images/home/contact/1.png"
                    alt="housebox"
                  />
                </div>
                <div className="space40" />
                <div className="btn-area">
                  <Link
                    href="/sidebar-grid"
                    style={{
                      fontSize: "16px",
                      padding: "8px 30px",
                      borderRadius: "5px",
                    }}
                  >
                    General Enquiries
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6"
              data-aos="zoom-in"
              data-aos-duration={1000}
            >
              <div
                className="project-featured-box"
                style={{ borderRadius: "5px" }}
              >
                <div className="img1">
                  <img
                    src="/assets/img/all-images/home/contact/4.png"
                    alt="housebox"
                  />
                </div>
                <div className="space40" />
                <div className="btn-area">
                  <Link
                    href="/sidebar-grid"
                    style={{
                      fontSize: "16px",
                      padding: "8px 30px",
                      borderRadius: "5px",
                    }}
                  >
                    Supplier Enquiries
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6"
              data-aos="zoom-in"
              data-aos-duration={1200}
            >
              <div
                className="project-featured-box"
                style={{ borderRadius: "5px" }}
              >
                <div className="img1">
                  <img
                    src="/assets/img/all-images/home/contact/1.png"
                    alt="housebox"
                  />
                </div>
                <div className="space40" />
                <div className="btn-area">
                  <Link
                    href="/sidebar-grid"
                    style={{
                      fontSize: "16px",
                      padding: "8px 30px",
                      borderRadius: "5px",
                    }}
                  >
                    Partner Enquiries
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6"
              data-aos="zoom-in"
              data-aos-duration={1200}
            >
              <div
                className="project-featured-box"
                style={{ borderRadius: "5px" }}
              >
                <div className="img1">
                  <img
                    src="/assets/img/all-images/home/contact/2.png"
                    alt="housebox"
                  />
                </div>
                <div className="space40" />
                <div className="btn-area">
                  <Link
                    href="/sidebar-grid"
                    style={{
                      fontSize: "16px",
                      padding: "8px 30px",
                      borderRadius: "5px",
                    }}
                  >
                    Investor Relations
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
