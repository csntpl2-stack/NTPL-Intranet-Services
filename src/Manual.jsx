import React from "react";
import HeadNTPL from "./Header2";
import Navbar from "./Navbar";

function Manual() {
  return (
    <>
      {/* Header Component */}
      <HeadNTPL />

      {/* Navbar Component */}
      <Navbar />

      <div className="container-fluid">
        {/* Dashboard Header */}
        <h2 className="text-center bg-primary text-white py-3 rounded-3 mb-4 fw-bold">
          Manual
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
                <td>6</td>
                <td>20/11/2023</td>
                <td>
                  <a
                    href="/documents/2024/Vigilance/Booklet on Public Procurement  Challenges and Way Forward 2023.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Public Procurement - Challenges and Way Forward - CVC
                  </a>
                </td>
              </tr>
              <tr>
                <td>5</td>
                <td>30/09/2019</td>
                <td>
                  <a
                    href="/library/manuals/Debarment Manual.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Debarment Manual
                  </a>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>11/07/2002</td>
                <td>
                  <a
                    href="/library/manuals/Circular - Updation of Manual on Procurement.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Circular - Updation of Manual on Procurement.pdf
                  </a>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>25/04/2025</td>
                <td>
                  <a
                    href="/library/manuals/Manual for Procurement of Consultancy & Other Services.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Manual for Procurement of Consultancy & Other Services
                  </a>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>25/04/2025</td>
                <td>
                  <a
                    href="/library/manuals/Manual for Procurement of Goods.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Manual for Procurement of Goods
                  </a>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>25/04/2025</td>
                <td>
                  <a
                    href="/library/manuals/Manual for Procurement of Works.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Manual for Procurement of Works
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

export default Manual;
