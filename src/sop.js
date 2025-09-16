import React, { useState, useEffect } from 'react';
import Header from './Header2';

const Sop = () => {
  const [reportFiles, setReportFiles] = useState({});

  useEffect(() => {
    const importAll = (requireContext) => {
      return requireContext.keys().reduce((acc, key) => {
        const pathParts = key.split('/');
        if (pathParts.length < 3) return acc;

        const directory = pathParts[1]; // Extract year-wise directory
        let fileName = pathParts[2];

        // Remove leading numbering (e.g., "14. Trip Report 06.11.2024" ? "Trip Report 06.11.2024")
        fileName = fileName.replace(/^\d+\.\s*/, ''); 

        if (!acc[directory]) {
          acc[directory] = [];
        }

        acc[directory].push({
          name: fileName,
          url: requireContext(key),
        });

        return acc;
      }, {});
    };

    try {
      const files = importAll(require.context('./SOP', true, /\.(pdf|docx|xlsx)$/));
      setReportFiles(files);
    } catch (error) {
      console.error("Error loading trip reports:", error);
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="card shadow-lg">
          <div className="card-header bg-primary text-white">
            <h3 className="text-center">Standard Operating Procedures</h3>
          </div>
          <div className="card-body">
            {Object.keys(reportFiles).length > 0 ? (
              Object.entries(reportFiles).map(([year, files], index) => (
                <div key={index} className="mb-3">
                  <button
                    className="btn btn-outline-primary w-100 text-start"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse-${index}`}
                  >
                    {year} <i className="fa fa-angle-down"></i>
                  </button>
                  <div id={`collapse-${index}`} className="collapse mt-2">
                    <ul className="list-group">
                      {files.map((file, fileIndex) => (
                        <li key={fileIndex} className="list-group-item d-flex justify-content-between align-items-center">
                          <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-primary text-decoration-none">
                            {file.name}
                          </a>
                          <a href={file.url} download className="btn btn-outline-primary btn-sm">
                            Download
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted">No reports available.</p>
            )}
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Sop;
