"use client";

import LeadCaptureForm from "@/components/ui/services/LeadCaptureForm";

export default function FinanceSection() {
  return (
    <>
      <div id="finance">
        <div className="contact-inner-section sp1">
          <div className="container">
            <div className="row align-items-start">
              {/* RIGHT FORM */}
              <div className="col-lg-5">
                <div className="contact-form-area">
                  <h4>Finance Application</h4>

                  <LeadCaptureForm
                    formType="FINANCE"
                    title="Finance Application"
                    submitLabel="Send Now"
                    defaultSubject="Finance Application"
                    defaultMessage="I want to apply for construction finance support and would like to discuss my project requirements."
                    successMessage="Finance application submitted successfully."
                  />
                </div>
              </div>
              {/* LEFT CONTENT */}
              <div className="col-lg-7">
                <div className="heading1">
                  <h5>Financial Support</h5>

                  <div className="space24" />

                  <h2>Empowering Your Growth</h2>

                  <div className="space24" />

                  <p style={{ textAlign: "justify" }}>
                    Flexible financing solutions designed to support
                    contractors, developers, and infrastructure projects with
                    fast approvals and reliable funding.
                  </p>
                </div>

                <div className="space40" />

                {/* INSURANCE CARDS */}
                <div className="row">
                  {/* CARD 1 */}
                  <div className="col-md-6 cards-section-wrapper">
                    <div className="insurance-card-area">
                      <div className="icon">
                        <i className="fa-solid fa-hand-holding-dollar"></i>
                      </div>

                      <div className="content">
                        <h4>Project Financing</h4>
                        <p>Flexible funding for large construction projects.</p>
                      </div>
                    </div>
                  </div>

                  {/* CARD 2 */}
                  <div className="col-md-6 cards-section-wrapper">
                    <div className="insurance-card-area">
                      <div className="icon">
                        <i className="fa-solid fa-helmet-safety"></i>
                      </div>

                      <div className="content">
                        <h4>Contractor Financing</h4>
                        <p>Quick capital for labor and material expenses.</p>
                      </div>
                    </div>
                  </div>

                  {/* CARD 3 */}
                  <div className="col-md-6 cards-section-wrapper">
                    <div className="insurance-card-area">
                      <div className="icon">
                        <i className="fa-solid fa-wallet"></i>
                      </div>

                      <div className="content">
                        <h4>Working Capital</h4>
                        <p>Maintain smooth cash flow for daily operations.</p>
                      </div>
                    </div>
                  </div>

                  {/* CARD 4 */}
                  <div className="col-md-6 cards-section-wrapper">
                    <div className="insurance-card-area">
                      <div className="icon">
                        <i className="fa-solid fa-truck-monster"></i>
                      </div>

                      <div className="content">
                        <h4>Equipment Loan</h4>
                        <p>Easy financing for machinery and heavy equipment.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
