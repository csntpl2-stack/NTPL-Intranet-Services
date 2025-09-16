import React, { useState, useEffect } from "react";
import Header from "./Header2";

const Circulars = () => {
  const [circulars, setCirculars] = useState([]);
  const [filteredCirculars, setFilteredCirculars] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const circularsPerPage = 12;

  useEffect(() => {
    // Fetch circulars from the server using fetch API
    const fetchCirculars = async () => {
      try {
        const response = await fetch("http://172.16.250.253:5006/circulars");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCirculars(data);
        setFilteredCirculars(data); // Initially, show all circulars

        // Extract unique divisions from data
        const uniqueDivisions = [...new Set(data.map((item) => item.Division))];
        setDivisions(uniqueDivisions);
      } catch (error) {
        console.error("Error fetching circulars:", error);
      }
    };

    fetchCirculars();
  }, []);

  // Filter circulars based on selected division
  useEffect(() => {
    if (selectedDivision === "All") {
      setFilteredCirculars(circulars);
    } else {
      setFilteredCirculars(circulars.filter((circular) => circular.Division === selectedDivision));
    }
    setCurrentPage(1); // Reset to first page when filter changes
  }, [selectedDivision, circulars]);

  // Get the circulars for the current page
  const indexOfLastCircular = currentPage * circularsPerPage;
  const indexOfFirstCircular = indexOfLastCircular - circularsPerPage;
  const currentCirculars = filteredCirculars.slice(indexOfFirstCircular, indexOfLastCircular);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="card shadow-lg">
          <div className="card-header bg-primary text-white">
            <h3 className="text-center">Circulars</h3>
          </div>

          {/* Division Filter Dropdown */}
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Filter by Division:</label>
              <select style={{width:"20%"}} className="form-select" value={selectedDivision} onChange={(e) => setSelectedDivision(e.target.value)}>
                <option value="All">All Divisions</option>
                {divisions.map((division, index) => (
                  <option key={index} value={division}>
                    {division}
                  </option>
                ))}
              </select>
            </div>

            {/* Circulars Table */}
            {currentCirculars.length > 0 ? (
              <>
                <table className="table table-bordered table-striped">
                  <thead className="bg-secondary text-white">
                    <tr>
                      <th>S.No.</th>
                      <th>Title</th>
                      <th>Division</th>
                      <th>Issue Date</th>
                      <th>Upload Date</th>
                      <th>Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCirculars.map((circular, index) => (
                      <tr key={circular.Circular_id}>
                        <td>{indexOfFirstCircular + index + 1}</td>
                        <td>{circular.Description}</td>
                        <td>{circular.Division}</td>
                        <td>{new Date(circular.Circular_Date).toLocaleDateString()}</td>
                        <td>{new Date(circular.Upload_Date).toLocaleDateString()}</td>
                        <td>
                          <a
                            href={`data:${circular.ContentType};base64,${circular.Data}`}
                            download={circular.Filename}
                            className="btn btn-outline-primary btn-sm"
                          >
                            Download
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <nav>
                  <ul className="pagination justify-content-center">
                    {Array.from({ length: Math.ceil(filteredCirculars.length / circularsPerPage) }, (_, i) => (
                      <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                        <button onClick={() => paginate(i + 1)} className="page-link">
                          {i + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </>
            ) : (
              <p className="text-center text-muted">No circulars available.</p>
            )}
          </div>

          <div className="card-footer text-muted text-center">
            Total Circulars: {filteredCirculars.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Circulars;
