import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";

function AdminReports() {
  const [reportsData, setReportsData] = useState([
    {
      reportId: 1,
      reportedReview: "Great product!",
      reportedBy: "JohnDoe",
      dateReported: "2023-06-05",
    },
    {
      reportId: 2,
      reportedReview: "Amazing product!",
      reportedBy: "JaneSmith",
      dateReported: "2023-06-05",
    },
    // Add more report objects as needed
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredReports = reportsData.filter((report) =>
    report.reportedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteReport = (reportId) => {
    setReportsData((prevReports) =>
      prevReports.filter((report) => report.reportId !== reportId)
    );
  };

  return (
    <div className="admin-products-page admin--page dashboard--page">
      <div className="header">
        <h3>Hello, Admin </h3>
        <p>View product information and manage product listings.</p>
      </div>
      <div className="main">
        <div className="upper">
          <h3>Reports List</h3>
          <div className="search-input">
            <input
              type="text"
              placeholder="Search by reported by"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <RiSearchLine size={18} />
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Reported Review</th>
              <th>Reported By</th>
              <th>Date Reported</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) => (
              <tr key={report.reportId}>
                <td>{report.reportId}</td>
                <td>{report.reportedReview}</td>
                <td>{report.reportedBy}</td>
                <td>{report.dateReported}</td>
                <td id="action">
                  <button
                    className="icon-button"
                    onClick={() => handleDeleteReport(report.reportId)}
                  >
                    <AiOutlineDelete size={18} color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Total Number of Reports: {filteredReports.length}</p>
      </div>
    </div>
  );
}

export default AdminReports;
