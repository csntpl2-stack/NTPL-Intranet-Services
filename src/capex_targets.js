import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header2";

const months = ['apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec', 'jan', 'feb', 'mar'];
const EDIT_PASSWORD = "mtp@ntpl"; // Replace with your desired password

const CapexTargetsPage = () => {
  const [data, setData] = useState([]);
  const [editedData, setEditedData] = useState({});
  const [editable, setEditable] = useState(false);
  const cellWidth = "6rem";
  const headColumnWidth = "145rem";

  useEffect(() => {
    axios.get("http://172.16.250.253:5006/api/capex-targets")
      .then(res => setData(res.data))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  const handleInputChange = (id, field, value) => {
    setEditedData(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: parseFloat(value)
      }
    }));
  };

  const handleSave = (row) => {
    const updates = {
      ...row,
      ...(editedData[row.id] || {})
    };

    axios.post("http://172.16.250.253:5006/api/capex-targets/update", updates)
      .then(() => {
        alert("Update successful");
        axios.get("http://172.16.250.253:5006/api/capex-targets")
          .then(res => setData(res.data));
        setEditedData(prev => {
          const newEdits = { ...prev };
          delete newEdits[row.id];
          return newEdits;
        });
      })
      .catch(err => {
        console.error("Error updating data:", err);
        alert("Update failed");
      });
  };

  const downloadCSV = () => {
    const header = ["ID", "Head", "BE 2025-26", ...months.flatMap(month => [month.toUpperCase(), `${month.toUpperCase()}_SPENT`]), "Total", "Total Spent", "Total Spent %", "Q1 %", "Q2 %", "Q3 %", "Q4 %"].join(',');
    const csvRows = data.map(row => {
      const rowData = [
        row.id,
        `"${row.head.replace(/"/g, '""')}"`,
        row.be_2025_26 || "-",
        ...months.flatMap(month => [row[month] || "-", row[`${month}_spent`] || 0]),
        row.total || "-",
        row.total_spent || "-",
        row.total_spent_pct !== null ? (row.total_spent_pct * 100).toFixed(2) : "-",
        row.q1_pct !== null ? (row.q1_pct * 100).toFixed(2) : "-",
        row.q2_pct !== null ? (row.q2_pct * 100).toFixed(2) : "-",
        row.q3_pct !== null ? (row.q3_pct * 100).toFixed(2) : "-",
        row.q4_pct !== null ? (row.q4_pct * 100).toFixed(2) : "-",
      ].join(',');
      return rowData;
    });
    const csvData = `${header}\n${csvRows.join('\n')}`;
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'CapexTargets.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEnableEdit = () => {
    
    if(editable){
        setEditable(false);
        return ;
    }
    const password = prompt("Enter password to enable editing:");
    if (password === EDIT_PASSWORD) {
      setEditable(true);
    } else if (password !== null) {
      alert("Incorrect password.");
    }
    // If password is null (user cancelled), do nothing
  };

  return (
    <div>
      <Header />
      <div className="container-fluid py-3">
        <div className="d-flex justify-content-center align-items-center mb-2 bg-primary text-white p-2">
          <h5 className="mb-0">Capex Targets</h5>
        </div>
        <div className="d-flex justify-content-end align-items-center mb-2">
          <button className="btn btn-sm btn-warning" style={{ width: "15%" }} onClick={handleEnableEdit}>
            {editable ? "Disable Edit" : "Enable Edit"}
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-sm text-center align-middle" style={{ fontSize: "0.75rem" }}>
            <thead className="table-secondary">
              <tr>
                <th>ID</th>
                <th style={{ width: headColumnWidth }}>Head</th>
                <th>BE 2025-26</th>
                {months.map(month => (
                  <React.Fragment key={month}>
                    <th style={{ width: cellWidth }}>{month.toUpperCase()}</th>
                    <th style={{ width: cellWidth }}>{month.toUpperCase()}_SPENT</th>
                  </React.Fragment>
                ))}
                <th style={{ width: cellWidth }}>Total</th>
                <th style={{ width: cellWidth }}>Total Spent</th>
                <th style={{ width: cellWidth }}>Total Spent %</th>
                <th style={{ width: cellWidth }}>Q1 %</th>
                <th style={{ width: cellWidth }}>Q2 %</th>
                <th style={{ width: cellWidth }}>Q3 %</th>
                <th style={{ width: cellWidth }}>Q4 %</th>
                <th style={{ width: "8rem" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map(row => (
                <tr key={row.id}>
                  <td style={{ width: "4rem" }}>{row.id}</td>
                  <td style={{ width: headColumnWidth }}>{row.head}</td>
                  <td style={{ width: "8rem" }}>{row.be_2025_26 || "-"}</td>

                  {months.map(month => (
                    <React.Fragment key={month}>
                      <td style={{ width: cellWidth }}>{row[month] || "-"}</td>
                      <td style={{ width: cellWidth }}>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control form-control-sm text-end"
                          value={editedData[row.id]?.[`${month}_spent`] !== undefined
                            ? editedData[row.id][`${month}_spent`]
                            : row[`${month}_spent`] || 0}
                          onChange={(e) => handleInputChange(row.id, `${month}_spent`, e.target.value)}
                          readOnly={!editable}
                          style={{ width: cellWidth, padding: "2px" }}
                        />
                      </td>
                    </React.Fragment>
                  ))}

                  <td style={{ width: cellWidth }}>{row.total || "-"}</td>
                  <td style={{ width: cellWidth }}>{row.total_spent || "-"}</td>
                  <td style={{ width: cellWidth }}>{row.total_spent_pct !== null ? (row.total_spent_pct * 100).toFixed(2) : "-"}</td>
                  <td style={{ width: cellWidth }}>{row.q1_pct !== null ? (row.q1_pct * 100).toFixed(2) : "-"}</td>
                  <td style={{ width: cellWidth }}>{row.q2_pct !== null ? (row.q2_pct * 100).toFixed(2) : "-"}</td>
                  <td style={{ width: cellWidth }}>{row.q3_pct !== null ? (row.q3_pct * 100).toFixed(2) : "-"}</td>
                  <td style={{ width: cellWidth }}>{row.q4_pct !== null ? (row.q4_pct * 100).toFixed(2) : "-"}</td>

                  {/* Save button */}
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleSave(row)}
                      disabled={!editable}
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Buttons below the table */}
        <div className="d-flex justify-content-end mt-3">
          <button style={{width:'15%'}} className="btn btn-sm btn-success" onClick={downloadCSV}>
            Download Data as Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CapexTargetsPage;