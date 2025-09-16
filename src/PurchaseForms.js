import React, { useState, useEffect } from 'react';
import Header from './Header2'

const PurchaseForms = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Dynamically import all files from the purchaseforms folder
    const importAll = (requireContext) => {
      return requireContext.keys().map((key) => ({
        name: key.replace('./', ''), // Extract file name
        url: requireContext(key), // Get file URL
      }));
    };

    const files = importAll(require.context('./purchaseforms', false, /\.(pdf|docx|xlsx)$/));
    setDocuments(files);
  }, []);

  return (
    <div>
        <Header/>
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h3 className="text-center">Download Purchase Forms</h3>
        </div>
        <div className="card-body">
          {documents.length > 0 ? (
            <ul className="list-group">
              {documents.map((doc, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {doc.name}
                  <a href={doc.url} download className="btn btn-outline-primary btn-sm">
                    Download
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-muted">No documents available.</p>
          )}
        </div>
        <div className="card-footer text-muted text-center">
          Total Files: {documents.length}
        </div>
      </div>
    </div>
    </div>
  );
};

export default PurchaseForms;
