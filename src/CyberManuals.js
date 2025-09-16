import React from "react";
import Header from "./Header2";

const manuals = [
  {
    title: "Cyber Security Guidelines for Government Employees",
    description: "Basic Manual (English). This guideline specifies the 'do’s and don’ts' with respect to cyber security in government offices.",
    link: "https://i4c.mha.gov.in/theme/resources/Cyber%20Security%20Guidelines%20for%20Government%20Employees.pdf",
    image: "https://i4c.mha.gov.in/theme/images/Cyber%20security%20guidelines.png" // Replace with actual image URL
  },
  {
    title: "Cyber Hygiene for Cyber Space",
    description: "DOs & Don’ts - Basic Manual (Hindi). This manual disseminates Cyber Hygiene Best Practices for industrial bodies and government officials.",
    link: "https://i4c.mha.gov.in/theme/resources/Cyber%20Hygiene%20for%20Cyber%20Space%20-%20Dos-Donts%20-%20Basic%20Hindi%20Manual.pdf.pdf",
    image: "https://i4c.mha.gov.in/theme/images/CyberHygiene.jpg" // Replace with actual image URL
  },
  {
    title: "Cyber Hygiene for Cyber Space",
    description: "DOs & Don’ts - Basic Manual (English). This manual disseminates Cyber Hygiene Best Practices for industrial bodies and government officials.",
    link: "https://i4c.mha.gov.in/theme/resources/Cyber%20Hygiene%20for%20Cyber%20Space%20-%20Dos-Donts-Basic%20English%20Manual.pdf",
    image: "https://i4c.mha.gov.in/theme/images/CyberHygiene.jpg" // Replace with actual image URL
  }
];

const CyberManuals = () => {
  return (
    <div className="container-fluid">
      <Header />
      <div className="text-center bg-primary text-white py-3 rounded mb-4">
        <h2 className="fw-bold">Guidelines & Manuals</h2>
      </div>
      
      <div className="container">
        {manuals.map((manual, index) => (
          <div key={index} className="row align-items-center border rounded p-3 mb-4">
            <div className="col-md-2 text-center">
              <a href={manual.link}>
                <img src={manual.image} alt={manual.title} className="img-fluid rounded" />
              </a>
            </div>
            <div className="col-md-10">
              <a href={manual.link} className="fw-bold text-primary text-decoration-none">
                <h5>{manual.title}</h5>
              </a>
              <p className="text-muted">{manual.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CyberManuals;
