import React, { useState } from "react";
import Header from "./Header2";

const UploadCircular = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [division, setDivision] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !description || !division || !issueDate) {
      setMessage("Please fill in all fields and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);
    formData.append("division", division);
    formData.append("issueDate", issueDate);

    try {
      const response = await fetch("http://172.16.250.253:5006/upload-circular", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setMessage(result.message);
      setDivision('');
      setDescription('');
      setFile(null);
      setIssueDate('');
    } catch (error) {
      console.error("Error uploading circular:", error);
      setMessage("Error uploading circular.");
    }
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="card shadow-lg">
          <div className="card-header bg-primary text-white">
            <h3 className="text-center">Upload New Circular</h3>
          </div>
          <div className="card-body">
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
               <label className="form-label">Division</label>
               <select
                 className="form-control"
                 value={division}
                 onChange={(e) => setDivision(e.target.value)}
                 required
               >
                 <option value="">Select Division</option>
                 <option value="CMD">CMD</option>
                 <option value="CEO">CEO</option>
                 <option value="Safety">Safety</option>
                 <option value="IT">IT</option>
                 <option value="Vigilance">Vigilance</option>
                 <option value="Human Resource">Human Resource</option>
                 <option value="Others">Others</option>
               </select>
             </div>

              <div className="mb-3">
                <label className="form-label">Issue Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Upload File</label>
                <input type="file" className="form-control" onChange={handleFileChange} required />
              </div>

              <button type="submit" className="btn btn-primary">Upload</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadCircular;
