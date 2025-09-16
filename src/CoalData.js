import React, { useEffect, useState } from "react";

const CoalDataTable = () => {
  const [coalData, setCoalData] = useState([]);
  const [mwgenData, setMwgenData] = useState([]);

  // Fetching data for the coal data table
  useEffect(() => {
    fetch("http://172.16.250.253:5005/api/coaldata")
      .then((response) => response.json())
      .then((data) => setCoalData(data))
      .catch((error) => console.error("Error fetching coal data:", error));
  }, []);

  // Fetching data for the MWGENDATA table
  useEffect(() => {
    fetch("http://172.16.250.253:5005/api/mwgendata")
      .then((response) => response.json())
      .then((data) => setMwgenData(data))
      .catch((error) => console.error("Error fetching MWGENDATA:", error));
  }, []);

  // Merge the coalData and mwgenData based on index (adjust based on actual linking logic)
  const mergedData = coalData.map((coalRow, index) => {
    const mwgenRow = mwgenData[index]; // Adjust based on your actual data linking logic
    return {
      ...coalRow,
      BW7FEEDRATE: mwgenRow ? mwgenRow.BW7FEEDRATE : "N/A",
      BW8FEEDRATE: mwgenRow ? mwgenRow.BW8FEEDRATE : "N/A"
    };
  });

  // Get today's date in YYYY-MM-DD format if coalData[0]?.DATE is not available
  const displayDate = coalData.length > 0 && coalData[0]?.DATE ? coalData[0].DATE : new Date().toISOString().split("T")[0];

  return (
    <div style={{ marginBottom: "4px", paddingTop: "0px"}} className="mt-2">
      <h5 className=" mb-3" style={{ marginTop: "23px", paddingTop: "10px",backgroundColor: "#3674B5" ,paddingBottom:'15px',fontSize:'15px' ,color:'white',padding: '10px', 
             borderRadius: '8px',}}>
        <strong>Coal Data Overview: {displayDate}</strong>
      </h5>
      <div style={{margin:'0px',padding:'0px'}} className="table-responsive">
        <table className="table table-striped table-bordered shadow">
          <thead className="table-primary text-center">
            <tr>
              <th style={{backgroundColor:'#198754', color:'white'}}>Opening Stock (T)</th>
              <th style={{backgroundColor:'#198754', color:'white'}}>Consumption (T)</th>
              <th style={{backgroundColor:'#198754', color:'white'}}>Receipt (T)</th>
              <th style={{backgroundColor:'#198754', color:'white'}}>Closing Stock (T)</th>
              <th style={{backgroundColor:'#198754', color:'white'}}>10A Transfer (T/H)</th>
              <th style={{backgroundColor:'#198754', color:'white'}}>10B Transfer (T/H)</th>
            </tr>
          </thead>
          <tbody>
            {mergedData.length > 0 ? (
              mergedData.map((row, index) => (
                <tr key={index} className="text-center">
                  <td style={{backgroundColor:'#E0FBE2', color:'black'}}>{row.OPNCOALSTK }</td>
                  <td style={{backgroundColor:'#E0FBE2', color:'black'}}>{row.COALCNSM }</td>
                  <td style={{backgroundColor:'#E0FBE2', color:'black'}}>{row.COALRECEPIT }</td>
                  <td style={{backgroundColor:'#E0FBE2', color:'black'}}>{row.CLSCOALSTK }</td>
                  <td style={{backgroundColor:'#E0FBE2', color:'black'}}>{row.BW7FEEDRATE}</td>
                  <td style={{backgroundColor:'#E0FBE2', color:'black'}}>{row.BW8FEEDRATE}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-danger">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoalDataTable;
