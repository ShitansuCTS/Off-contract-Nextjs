"use client";

import LeadCaptureForm from "@/components/ui/services/LeadCaptureForm";

export default function InsuranceSection() {
  return (
    <>
      <div
        id="insurance"
        style={{
          backgroundImage: "url('/assets/img/all-images/bg/bg1.png')",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="contact-inner-section sp1">
          <div className="container">
            <div className="row align-items-start">
              {/* LEFT CONTENT */}
              <div className="col-lg-7">
                <div className="heading1">
                  <h5>Construction Insurance</h5>

                  <div className="space24" />

                  <h2>Construction Insurance Services</h2>

                  <div className="space24" />

                  <p style={{ textAlign: "justify" }}>
                    Protect your investments, workforce, and liabilities with
                    tailored insurance packages designed specifically for the
                    construction sector.
                  </p>
                </div>

                <div className="space40" />

                {/* INSURANCE CARDS */}
                <div className="row">
                  {/* CARD 1 */}
                  <div className="col-md-6 cards-section-wrapper">
                    <div className="insurance-card-area">
                      <div className="icon">
                        <i className="fa-solid fa-building-shield"></i>
                      </div>

                      <div className="content">
                        <h4>Project Insurance</h4>
                        <p>Covers damage to works, materials, and equipment.</p>
                      </div>
                    </div>
                  </div>

                  {/* CARD 2 */}
                  <div className="col-md-6 cards-section-wrapper">
                    <div className="insurance-card-area">
                      <div className="icon">
                        <i className="fa-solid fa-user-shield"></i>
                      </div>

                      <div className="content">
                        <h4>Worker Insurance</h4>
                        <p>Medical and compensation for site workers.</p>
                      </div>
                    </div>
                  </div>

                  {/* CARD 3 */}
                  <div className="col-md-6 cards-section-wrapper">
                    <div className="insurance-card-area">
                      <div className="icon">
                        <i className="fa-solid fa-scale-balanced"></i>
                      </div>

                      <div className="content">
                        <h4>Liability Coverage</h4>
                        <p>Third-party damage and legal protection.</p>
                      </div>
                    </div>
                  </div>

                  {/* CARD 4 */}
                  <div className="col-md-6 cards-section-wrapper">
                    <div className="insurance-card-area">
                      <div className="icon">
                        <i className="fa-solid fa-truck-fast"></i>
                      </div>

                      <div className="content">
                        <h4>Transit Insurance</h4>
                        <p>Protection during material transport.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT FORM */}
              <div className="col-lg-5">
                <div className="contact-form-area">
                  <h4>Request Insurance Quote</h4>

                  <LeadCaptureForm
                    formType="INSURANCE"
                    title="Insurance Quote Request"
                    submitLabel="Send Now"
                    defaultSubject="Insurance Quote Request"
                    defaultMessage="I want to request a construction insurance quote for my project."
                    successMessage="Insurance enquiry submitted successfully."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
