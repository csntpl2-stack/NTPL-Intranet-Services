import React, { useState } from "react";
import Header from "./Header2";

const InsertGrossGeneration = () => {
  const [formData, setFormData] = useState({
    EntryDate: "",
    DayTargetMU: "",
    DayActualMU: "",
    DayPAF: "",
    DayPLF: "",
    MonthTargetMU: "",
    MonthActualMU: "",
    MonthPAF: "",
    MonthPLF: "",
    QuarterTargetMU: "",
    QuarterActualMU: "",
    QuarterPAF: "",
    QuarterPLF: "",
    YearTargetMU: "",
    YearActualMU: "",
    YearPAF: "",
    YearPLF: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDownload = async () => {
    try {
      const response = await fetch("http://172.16.251.202:5006/download-generation-history");
      if (!response.ok) {
        throw new Error("Failed to download file");
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "GrossGenerationHistory.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const password = prompt("Enter Password:");
    if (password !== "eemg@ntpl") {
      setMessage("Incorrect password. Submission denied.");
      return;
    }

    const response = await fetch("http://172.16.251.202:5006/insert_gross_generation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (result.success) {
      setMessage("Record inserted successfully!");
      setFormData({
        EntryDate: "",
        DayTargetMU: "",
        DayActualMU: "",
        DayPAF: "",
        DayPLF: "",
        MonthTargetMU: "",
        MonthActualMU: "",
        MonthPAF: "",
        MonthPLF: "",
        QuarterTargetMU: "",
        QuarterActualMU: "",
        QuarterPAF: "",
        QuarterPLF: "",
        YearTargetMU: "",
        YearActualMU: "",
        YearPAF: "",
        YearPLF: "",
      });
    } else {
      setMessage(result.message || "Error inserting record");
    }
  };

  return (
    <div>
      <Header />
      <div className="container mt-4">
        <h2 className="text-center text-primary">Insert Gross Generation</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Entry Date</label>
              <input
                type="date"
                name="EntryDate"
                value={formData.EntryDate}
                onChange={handleChange}
                className="form-control"
                max={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
            {Object.keys(formData).filter(key => key !== "EntryDate").map((key) => (
              <div className="col-md-6 mb-3" key={key}>
                <label className="form-label">{key.replace(/([A-Z])/g, " $1").trim()}</label>
                <input
                  type="number"
                  step="0.01"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            ))}
          </div>
          <button type="submit" className="btn btn-success w-100">Submit</button>
          <button onClick={handleDownload} style={{width:'20%',marginLeft:"39%",marginTop:"5px"}} className="btn btn-primary">Download Generation History</button>
        </form>
      </div>
    </div>
  );
};

export default InsertGrossGeneration;