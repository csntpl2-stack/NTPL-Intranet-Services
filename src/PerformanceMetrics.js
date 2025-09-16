import React from "react";

const Performance = () => {
  const performanceData = [
    {
      title: "PLF",
      columns: ["Highest PLF", "Last Financial Year"],
      values: [
        { percentage: "71.378%", year: "2016-17" },
        { percentage: "62.185%", year: "2023-24" },
      ],
      bgColor: "bg-warning text-dark",
    },
    {
      title: "OPLF",
      columns: ["Last Financial Year", "Highest OPLF"],
      values: [
        { percentage: "70.910%", year: "2023-24" },
        { percentage: "83.253%", year: "2016-17" },
      ],
      bgColor: "bg-info text-white",
    },
    {
      title: "PAF",
      columns: ["Last Financial Year", "Highest PAF"],
      values: [
        { percentage: "69.295%", year: "2023-24" },
        { percentage: "90.877%", year: "2020-21" },
      ],
      bgColor: "bg-secondary text-white",
    },
  ];

  return (
    <div className="container d-flex justify-content-center align-items-center flex-column" style={{ minHeight: '50vh' }}>
      <h2 className="text-center mb-4">Performance Metrics</h2>
      <div className="row w-100 justify-content-around">
        {performanceData.map((metric, index) => (
          <div key={index} className="col-md-6 mb-4">
            <div className={`table-responsive ${metric.bgColor}`}>
              <table className="table table-bordered text-center">
                <tbody>
                  <tr>
                    <th colSpan="3" className={`p-2 ${metric.bgColor}`}>
                      {metric.title}
                    </th>
                  </tr>
                  <tr className="table-secondary">
                    <th>{metric.columns[0]}</th>
                    <th>Value</th>
                    <th>{metric.columns[1]}</th>
                    <th>Value</th>
                  </tr>
                  <tr>
                    <td>{metric.values[0].year}</td>
                    <td className="fw-bold">{metric.values[0].percentage}</td>
                    <td>{metric.values[1].year}</td>
                    <td className="fw-bold">{metric.values[1].percentage}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Performance;
