export default function DashboardLeadsPage() {
  return (
    <div className="dashboard-page">
      {/* PAGE HEADER */}
      <div className="dashboard-page-header">
        <h2>Leads Management</h2>
        <p>Manage all customer inquiries and business leads.</p>
      </div>

      {/* TOP CARDS */}
      <div className="dashboard-stats-grid">
        <div className="dashboard-card">
          <span>Total Leads</span>
          <h3>120</h3>
        </div>

        <div className="dashboard-card">
          <span>New Leads</span>
          <h3>18</h3>
        </div>

        <div className="dashboard-card">
          <span>In Progress</span>
          <h3>42</h3>
        </div>

        <div className="dashboard-card">
          <span>Closed Leads</span>
          <h3>60</h3>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="dashboard-card" style={{ marginTop: "30px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: "800",
            }}
          >
            Recent Leads
          </h3>

          <button type="button">Add New Lead</button>
        </div>

        {/* TABLE */}
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Client Name</th>
                <th>Phone</th>
                <th>Service</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>01</td>
                <td>Rahul Sharma</td>
                <td>+91 9876543210</td>
                <td>Construction Material</td>
                <td>
                  <span
                    style={{
                      background: "#d5d51f",
                      padding: "6px 12px",
                      borderRadius: "30px",
                      fontWeight: "700",
                    }}
                  >
                    New
                  </span>
                </td>
                <td>12 May 2026</td>
              </tr>

              <tr>
                <td>02</td>
                <td>Amit Das</td>
                <td>+91 9876543200</td>
                <td>Equipment Rental</td>
                <td>
                  <span
                    style={{
                      background: "#06443f",
                      color: "#fff",
                      padding: "6px 12px",
                      borderRadius: "30px",
                      fontWeight: "700",
                    }}
                  >
                    In Progress
                  </span>
                </td>
                <td>10 May 2026</td>
              </tr>

              <tr>
                <td>03</td>
                <td>Priya Patel</td>
                <td>+91 9123456789</td>
                <td>Insurance</td>
                <td>
                  <span
                    style={{
                      background: "#22c55e",
                      color: "#fff",
                      padding: "6px 12px",
                      borderRadius: "30px",
                      fontWeight: "700",
                    }}
                  >
                    Closed
                  </span>
                </td>
                <td>08 May 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
