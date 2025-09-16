import React, { useState, useEffect } from "react";
import Header from "./Header2";
import poster from './pictures/Cyberposter.png'

// Dynamically import all files from the circulars and knowledge directories
const circularsContext = require.context("./CyberSecurity/Ciruclars", false, /\.(pdf)$/);
const knowledgeContext = require.context("./CyberSecurity/Knowledge", false, /\.(pptx)$/);

// Extract file names
const circulars = circularsContext.keys().map(file => file.replace("./", ""));
const ppts = knowledgeContext.keys().map(file => file.replace("./", ""));

const CyberCirculars = () => {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    setShowModal(true); // Open modal when page loads
  }, []);

  return (
    <div className="container-fluid">
      <Header />

      {/* ?? Cyber Awareness Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0, 0, 0, 0.5)" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Cyber Awareness Poster</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body text-center">
                <img
                  src={poster} // Replace with your actual image path
                  alt="Cyber Awareness"
                  className="img-fluid rounded shadow-lg"
                  style={{width:'800px'}}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Page Title */}
      <div className="text-center bg-primary text-white py-3 rounded mb-4">
        <h2 className="fw-bold">Cyber Security</h2>
      </div>

      <div className="d-flex">
        {/* ?? Sidebar (Navbar) */}
        <div className="position-fixed" style={{ top: "244px", left: 0, width: "350px", zIndex: 1000 }}>
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white text-center">
              <h3>Menu</h3>
            </div>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item text-center">
                  <a href="/cyber-awareness-videos" className="btn btn-outline-primary w-100">
                    Cyber Awareness Videos
                  </a>
                </li>
                <li className="list-group-item text-center">
                  <a href="/cyber-manuals" className="btn btn-outline-primary w-100">
                    Cyber Manuals
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ?? Main Content (Circulars & PPTs) */}
        <div className="container mt-4 ms-250" style={{ marginLeft: "450px" }}>
          <div className="row w-100">
            {/* ?? Corporate Circulars Section */}
            <div className="col-lg-6 mb-3">
              <div className="card shadow-lg h-100">
                <div className="card-header bg-primary text-white text-center">
                  <h3>Corporate Circulars</h3>
                </div>
                <div className="card-body overflow-auto" style={{ maxHeight: "700px" }}>
                  {circulars.length > 0 ? (
                    <ul className="list-group">
                      {circulars.map((file, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center text-truncate">
                          {file}
                          <a href={require(`./CyberSecurity/Ciruclars/${file}`)} className="btn btn-sm btn-outline-primary" download>
                            Download
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-muted">No circulars available.</p>
                  )}
                </div>
                <div className="card-footer text-muted text-center">
                  Total Files: {circulars.length}
                </div>
              </div>
            </div>

            {/* ?? Knowledge PPTs Section */}
            <div className="col-lg-6 mb-3">
              <div className="card shadow-lg h-100">
                <div className="card-header bg-primary text-white text-center">
                  <h3>Knowledge (PPTs)</h3>
                </div>
                <div className="card-body overflow-auto" style={{ maxHeight: "700px" }}>
                  {ppts.length > 0 ? (
                    <ul className="list-group">
                      {ppts.map((file, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center text-truncate">
                          {file}
                          <a href={require(`./CyberSecurity/Knowledge/${file}`)} className="btn btn-sm btn-outline-primary" download>
                            Download
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-muted">No PPTs available.</p>
                  )}
                </div>
                <div className="card-footer text-muted text-center">
                  Total Files: {ppts.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default CyberCirculars;
