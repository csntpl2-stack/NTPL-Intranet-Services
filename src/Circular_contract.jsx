import React from "react";
import HeadNTPL from "./Header2";
import Navbar from "./Navbar";

function Circular_contract() {
  return (
    <>
      {/* Header Component */}
      <HeadNTPL />

      {/* Navbar Component */}
      <Navbar />

      <div className="container-fluid">
        {/* Dashboard Header */}
        <h2 className="text-center bg-primary text-white py-3 rounded-3 mb-4 fw-bold">
          Circular
        </h2>

        <div className="table-responsive">
          <table className="table table-bordered table-hover shadow-sm">
            <thead className="table-dark">
              <tr>
                <th scope="col">S no.</th>
                <th scope="col">Circular Date</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>5</td>
                <td>02/08/2023</td>
                <td>
                  <a
                    href="/files/VAW%202023.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CVC Circular - Observance of Vigilance Awareness Week-2023
                  </a>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>28/01/2013</td>
                <td>
                  <a
                    href="/library/CVC/CVC_Guidelines_Booklet.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Gist of CVC Guidelines
                  </a>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>11/09/2003</td>
                <td>
                  <a
                    href="/library/CVC/CVC%20-%20Circulars%20&%20Guidelines.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CVC Circulars/guidelines
                  </a>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>21/11/2002</td>
                <td>
                  <a
                    href="/library/CVC/CVC%20-%20Common%20irregularities%20in%20Elec,Mech,%20Other%20Contracts.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Common irregularities in Elec, Mech, Other Contracts
                  </a>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>15/01/2002</td>
                <td>
                  <a
                    href="/library/CVC/CVC%20-%20Common%20irregularities%20in%20Purchase%20Contract%20&%20Guidelines.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Common irregularities in Purchase Contract & Guidelines
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Circular_contract;
