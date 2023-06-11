import React, { useState, useEffect } from "react";
import { RiSearchLine } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";
import {
  useGetReportsQuery,
  useDeleteReportMutation,
} from "../../redux/Slices/apiSlice";

function AdminReports() {
  const [reportsData, setReportsData] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const [deleteReport] = useDeleteReportMutation();
  const { data: reportssData, isLoading } = useGetReportsQuery();

  useEffect(() => {
    if (reportssData) {
      setReportsData(reportssData);
    }
  }, [reportssData]);

  console.log(reportsData);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredReports = reportsData.filter((report) =>
    report.user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteReport = (reportId) => {
    setConfirmationMessage("");

    setReportsData((prevReports) =>
      prevReports.filter((report) => report.reportId !== reportId)
    );

    deleteReport(reportId);

    setConfirmationMessage("Report deleted successfully.");
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
                <td>{report.review.content}</td>
                <td>{report.user.username}</td>
                <td>{report.date.slice(0, 10)}</td>
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
        {confirmationMessage && (
          <p className="confirmation-message">{confirmationMessage}</p>
        )}
        <p>Total Number of Reports: {filteredReports.length}</p>
      </div>
    </div>
  );
}

export default AdminReports;
