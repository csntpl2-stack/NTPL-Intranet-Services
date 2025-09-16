import React, { useEffect, useState } from "react";
import HeadNTPL from "./Header2";
import Navbar from "./Navbar";

export default function Contract() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const req = require.context('./purchaseforms', false, /\.(pdf|docx|xlsx)$/);
    const files = req.keys().map((path) => ({
      name: path.replace('./', ''),
      url: req(path),
    }));
    setDocuments(files);
  }, []);

  return (
    <>
      {/* Header Image */}
      {/* <img
        src={HeadNTPL}
        alt="Header"
        className="d-block mx-auto"
        style={{ height: "80px" }}
      /> */}
      <HeadNTPL/>

      <Navbar />

      <div className="container-fluid my-5">
        <div className="card shadow-lg">
          {/* Header */}
          <div className="card-header bg-primary text-white text-center">
            <h3 className="mb-0">Download Purchase Forms</h3>
          </div>

          {/* Body */}
          <div className="card-body">
            {documents.length > 0 ? (
              <ul className="list-group list-group-flush">
                {documents.map((doc, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span className="text-truncate" style={{ maxWidth: "70%" }}>
                      {doc.name}
                    </span>
                    <a
                      href={doc.url}
                      download
                      className="btn btn-sm btn-primary"
                    >
                      Download
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-muted">No documents available.</p>
            )}
          </div>

          {/* Footer */}
          <div className="card-footer text-center text-muted small">
            Total Files: {documents.length}
          </div>
        </div>
      </div>
    </>
  );
}
