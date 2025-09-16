import { useState } from "react";
import chairman from './directors/prasannakumar.jpg';
import finance from './directors/Prasannakumaracharya.jpg';
import power from './directors/venkatachalam.png';
import goyal from './directors/DeepakGoyal.jpg';
import tangedco from './directors/Shri K Karukkuvel Rajan.jpeg';
import mines from './directors/ChandraSuman.jpg';
import Header from "./Header2";

const directors = [
  { id: 1, name: "Shri M. Prasanna Kumar", position: "Chairman", experience: "Chairman and Managing Director. Shri Prasanna Kumar Motupalli assumed charge as CMD of NLCIL on 12th January 2023. He has an illustrious career spanning over 34 years in the Power sector and Coal, previously serving as Managing Director of Gujarat State Electricity Corporation Ltd. (GSECL) and Executive Director at NTPC. He has successfully led several key initiatives and holds multiple prestigious awards and qualifications.", image: chairman },
  { id: 2, name: "Shri M. Venkatachalam", position: "Director", experience: "Director (Power). A Mechanical Engineer with diverse experience in Nuclear station operations, project construction, and commissioning, Shri Venkatachalam has served as Executive Director at Nuclear Power Corporation of India Limited (NPCIL) and has led significant projects, including the commissioning of India's first indigenous 700 MW nuclear power plant.", image: power },
  { id: 3, name: "Dr. Prasanna Kumar Acharya", position: "Director", experience: "Director (Finance). Dr. Acharya is a seasoned finance professional with over 28 years of experience in Central, State, and Private-owned Organizations. He holds multiple degrees, including a Ph.D. in Commerce, and has played a crucial role in securing significant financial deals for major projects", image: finance },
  { id: 4, name: "Dr. Suresh Chandra Suman", position: "Director", experience: "Director (Planning).Dr. Suresh Chandra Suman, a Mining Engineer, assumed the position of Director (Mines) at NLC India Limited on 11th May, 2022. He graduated with distinction from Bihar Institute of Technology and holds a Doctorate in Coal Mining Safety from IIT (Indian School of Mines), Dhanbad. Dr. Suman has extensive experience in the mining industry, having served for 23 years at Eastern Coalfields Ltd., a challenging subsidiary of Coal India Limited and 3 years at South Eastern Coalfields Ltd. He has held various responsible positions in both Coal India Limited and NLC India Limited, including Manager of Mines and Agent of Mines.", image: mines },
  { id: 5, name: "Shri Deepak Goel", position: "Director", experience: "TANGEDCO DIRECTOR", image: goyal },
  { id: 6, name: "Shri K Karukkuvel Rajan", position: "Director", experience: "TANGEDCO DIRECTOR", image: tangedco },
];

const BoardOfDirectors = () => {
  const [selectedDirector, setSelectedDirector] = useState(null);

  return (
    <div>
      <Header />
      <div className="container-fluid mt-4">
        <h2 className="text-center fw-bold bg-primary text-white py-3 rounded mb-4">Board of Directors</h2>
        
        {/* Row 1: Single centered image */}
        <div className="row justify-content-center mb-4">
          <div className="col-lg-4 d-flex justify-content-center">
            <DirectorCard director={directors.find(d => d.id === 1)} setSelectedDirector={setSelectedDirector} />
          </div>
        </div>

        {/* Row 2: Two images side by side */}
        <div className="row justify-content-center mb-4">
          <div className="col-lg-4 d-flex justify-content-center">
            <DirectorCard director={directors.find(d => d.id === 5)} setSelectedDirector={setSelectedDirector} />
          </div>
          <div className="col-lg-4 d-flex justify-content-center">
            <DirectorCard director={directors.find(d => d.id === 6)} setSelectedDirector={setSelectedDirector} />
          </div>
        </div>

        {/* Row 3: Three images evenly spaced */}
        <div className="row justify-content-center">
          <div className="col-lg-4 d-flex justify-content-center">
            <DirectorCard director={directors.find(d => d.id === 2)} setSelectedDirector={setSelectedDirector} />
          </div>
          <div className="col-lg-4 d-flex justify-content-center">
            <DirectorCard director={directors.find(d => d.id === 3)} setSelectedDirector={setSelectedDirector} />
          </div>
          <div className="col-lg-4 d-flex justify-content-center">
            <DirectorCard director={directors.find(d => d.id === 4)} setSelectedDirector={setSelectedDirector} />
          </div>
        </div>

        {/* Bootstrap Modal */}
        <DirectorModal selectedDirector={selectedDirector} />
      </div>
    </div>
  );
};

// Component for displaying a director's card
const DirectorCard = ({ director, setSelectedDirector }) => {
  if (!director) return null;

  return (
    <div className="card text-center shadow-lg p-3" style={{ width: "250px", padding: "20px" }}>
      <img
  src={director.image}
  alt={director.name}
  className="mx-auto"
  style={{
    width: "150px",
    height: "200px",
    objectFit: "cover",
    cursor: "pointer",
    border: "4px solid #007bff"
  }}
  data-bs-toggle="modal"
  data-bs-target="#directorModal"
  onClick={() => setSelectedDirector(director)}
/>
      <div className="card-body">
        <h6 className="fw-bold">{director.name}</h6>
        <p className="text-muted mb-1">{director.position}</p>
      </div>
    </div>
  );
};

// Bootstrap Modal component
const DirectorModal = ({ selectedDirector }) => {
  return (
    <div className="modal fade" id="directorModal" tabIndex="-1" aria-labelledby="directorModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="directorModalLabel">{selectedDirector?.name}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div style={{ textAlign: "left" }} className="modal-body">
            <p><strong>Position:</strong> {selectedDirector?.position}</p>
            <p><strong>Experience:</strong> {selectedDirector?.experience}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardOfDirectors;
