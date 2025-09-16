import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const commonClasses = "btn btn-outline-light px-4 py-2 rounded-pill";

  return (
    <div className="container-fluid py-3">
      <div className="bg-primary text-white text-center rounded-4 p-4 shadow-lg">
        <h3>NTPL Contracts and Purchase</h3>
        <br/>
        {/* Use row and col-auto for consistent horizontal layout */}
        <div className="row justify-content-center g-3">
        <div className="col-auto">
            <button
              className={commonClasses}
              onClick={() => navigate("/")}
            >
              Intranet Home
            </button>
          </div>
          <div className="col-auto">
            <button
              className={commonClasses}
              onClick={() => navigate("/contarct-purchase")}
            >
              Purchase Forms
            </button>
          </div>
          <div className="col-auto">
            <button
              className={commonClasses}
              onClick={() => navigate("/ContractandPurchase")}
            >
              Contracts & Purchase
            </button>
          </div>
          <div className="col-auto">
            <button
              className={commonClasses}
              onClick={() => navigate("/contrat-manuals")}
            >
              Manuals
            </button>
          </div>
          <div className="col-auto">
            <a
              href="http://172.16.250.253:3014/"
              target="_blank"
              rel="noopener noreferrer"
              className={commonClasses}
            >
              Tender Updates
            </a>
          </div>
          <div className="col-auto">
            <button
              className={commonClasses}
              onClick={() => navigate("/contract-circulars")}
            >
              Circulars
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
