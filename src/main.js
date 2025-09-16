import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import MainContent from './MainContent'
import LatestNews from './SlidingBar';
import { useNavigate } from 'react-router-dom';
import DOP from './DOP/Delegation Of Power.pdf'

function Main() {
  const [HitCount, setHitCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const navigate = useNavigate();

  // Function to open the modal with the relevant message
  const handleButtonClick = (message,event) => {
    setModalMessage(message);
    setModalHeader(event.target.innerHTML)
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
  };
  

  useEffect(() => {
    setHitCount(prevCount => prevCount + 1);
  }, []);

  return (
    <div className="container-fluid">
           <Header/>
           
           


      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>Close</button>
            <hr/>
            <h4>{modalHeader}</h4>
            <hr/>
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
      <LatestNews/>

      <header className="text-center py-3"> 
  <div className="d-flex justify-content-center gap-3">
    <button 
      onClick={() => navigate("/boardofdirectors")} 
      className="btn btn-sm btn1" 
      style={{backgroundColor:'#3674B5',color:'white'}}
      >
      Board of Directors
    </button>

    <button 
      className="btn btn-sm btn2" 
      onClick={(e) => handleButtonClick("To strive for operational excellence in power generation and to emerge as an environmental friendly and socially responsible leading power company.", e)}
      style={{backgroundColor:'#3674B5',color:'white'}}>
      Vision
    </button>

    <button 
      className="btn btn-sm btn3" 
      onClick={(e) => handleButtonClick("To strive towards greater cost competitiveness and work towards continued financial strength. To continually imbibe best practices from the best Indian and International Organizations engaged in power generation. To play an active role in society and be sensitive to emerging environmental issues.", e)}
      style={{backgroundColor:'#3674B5',color:'white'}}>
      Mission
    </button>

    <button 
      className="btn btn-sm btn4" 
      onClick={(e) => handleButtonClick(
        `• National Orientation\n
         • Learning, Development and Resilience\n
         • Commitment to Excellence\n
         • Innovation and Creativity\n
         • Leadership and Loyalty\n
         • Customer Focus\n
         • Organizational Pride and Growing Together\n
         • Mutual Trust and Team Work\n
         • Motivation\n
         • Integrity, Accountability and Transparency\n
         • Total Quality and Total Wellness\n
         • Safety and Sustainability`, e
       )}
       style={{backgroundColor:'#3674B5',color:'white'}}>
       Core Values
    </button>
  </div>
</header>

      {/* Sidebar and Main Content */}
      <div className="row">
        {/* Sidebar Section */}
        <aside className="col-auto bg-light py-3">
      <nav className="d-grid gap-3">
        <ul className="root-menu">
          {/* Home Dropdown */}
          <li className="dropdown">
          <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-sm">
             Home <i className="fa fa-angle-down"></i>
            </button>
            <div className="subMenu">
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.251.202:3005/chairmanmessages.aspx" target="_blank">
                  Chairman Messages
                </a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.251.202:3005/CEOMessages.aspx" target="_blank">
                  CEO Messages
                </a>
              </button>
            </div>
          </li>

          {/* About US Dropdown */}
          <li className="dropdown">
            <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
              About US <i className="fa fa-angle-down"></i>
            </button>
            <div className="subMenu">
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.251.202:3005/documents/2024/Awards.pdf" target="_blank">
                  Awards
                </a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.251.202:3005/documents/2024/Achievements.pdf" target="_blank">
                  Achievements
                </a>
              </button>
            </div>
          </li>

          <li>
            <a 
              href="http://172.16.251.202:3005/vigilance/files/DOP.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <button 
                style={{ backgroundColor: '#941010', color: 'white', textAlign: 'left' }} 
                className="btn btn-warning btn-sm"
              >
                DOP
              </button>
            </a>
          </li>

          {/* Plant Dropdown */}
          <li className="dropdown">
            <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
              Plant <i className="fa fa-angle-down"></i>
            </button>
            <div className="subMenu">
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.251.202:3005/coaldispaly.aspx" target="_blank">
                  Coal Display
                </a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="https://ceontpl-my.sharepoint.com/:x:/g/personal/admin_ceontpl_onmicrosoft_com/EbAq_nXOfxJHhjC5fUamRHcBP_jhBLbl1jWRyQNp1d-z2Q?e=m4Fza9" target="_blank">
                Statutory Compliances
                </a>
              </button>
            </div>
          </li>
          {/* BTG Dropdown */}
          <li className="dropdown">
            <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
              BTG Operation & Maintenance<i className="fa fa-angle-down"></i>
            </button>
            <div className="subMenu">
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.251.202:3005/btgcirculars.aspx" target="_blank">
                  Circulars
                </a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.251.202:3005/operationmanual.aspx" target="_blank">
                  Operation Manuals
                </a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.251.202:3005/operationscheme.aspx" target="_blank">
                  Operation Schemes
                </a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.251.202:3005/uploadlogin.aspx" target="_blank">
                  Circulars Upload
                </a>
              </button>
            </div>
          </li>


           {/* Circular Link */}
           <li className="dropdown">
            <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} onClick={()=>navigate('/circulars')}className="btn btn-warning btn-sm">
              Circular <i className="fa fa-angle-down" style={{ visibility: 'hidden' }}></i>
            </button>
            <div className="subMenu">
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} href='/circularlogin' className="btn btn-warning btn-sm">
                Upload Circular
              </button>
              </div>
          </li>


          <li className="dropdown">
            <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} onClick={() => navigate('/contarct-purchase')} className="btn btn-warning btn-sm">
              Contract & Purchase <i className="fa fa-angle-down" style={{ visibility: 'hidden' }}></i>
            </button>
          </li>

          


           {/* CSR Link */}
           <li className="dropdown">
            <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} onClick={() => window.location.href = "http://172.16.251.202:3005/csrphotos.aspx"} className="btn btn-warning btn-sm">
              CSR <i className="fa fa-angle-down" style={{ visibility: 'hidden' }}></i>
            </button>
            <div className="subMenu">
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.251.202:3005/safety.aspx" target='_blank'>Safety Policy</a>
              </button>
            </div>
          </li>

          <li className="dropdown">
            <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} href="/cybersecurity" className="btn btn-warning btn-sm">
              Cyber Security <i className="fa fa-angle-down" style={{ visibility: 'hidden' }}></i>
            </button>
          </li>

          <li className="dropdown">
            <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
              Finance <i className="fa fa-angle-down"></i>
            </button>
            <div className="subMenu">
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.250.253:9870/" target="_blank">
                  Digital bank
                </a>
              </button>
            </div>
          </li>

          <li className="dropdown">
            <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
              HR <i className="fa fa-angle-down"></i>
            </button>
            <div className="subMenu">
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.251.202:3005/HR/HR_AdminLoginFrom.aspx" target="_blank">
                  Admin Login
                </a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.251.202:3005/HR/HR_FormDisplay.aspx" target="_blank">
                  Forms
                </a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.251.202/hrphotogallery" target="_blank">
                  CSR Photo Gallery
                </a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.251.202/hrgallerylogin" target="_blank">
                  CSR Photo Upload
                </a>
              </button>
            </div>
          </li>

          {/* Intra Applications Dropdown */}
          <li className="dropdown">
            <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
              Intranet Applications <i className="fa fa-angle-down"></i>
            </button>
            <div className="subMenu">
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.250.253:6191/" target="_blank">
                  NTPL-MOH
                </a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.250.253:2021/Login/Index?ReturnUrl=%2f" target="_blank">
                  Asset Tracking
                </a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.250.253:6660/" target="_blank">
                  NTPL Dispensary Portal
                </a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.250.253:6001/" target="_blank">
                  Online Complaint Management System
                </a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.250.253:6199/" target="_blank">
                  Contract Management System
                </a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.251.202:3002/" target="_blank">
                  Employee Management System
                </a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.250.253:3001/" target="_blank">
                  Visitor Pass Management 
                </a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.251.202:3019/" target="_blank">
                  Guest House Management 
                </a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="/taskmanager-login" target="_blank">
                  Task Manager
                </a>
              </button>
            </div>
          </li>

          {/* Knowledge Management Link */}
          <li className="dropdown">
            <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} onClick={() => window.open("http://172.16.251.202:3005/knowledgenew.aspx", "_blank")} className="btn btn-warning btn-sm">
              Knowledge Management <i className="fa fa-angle-down" style={{ visibility: 'hidden' }}></i>
            </button>
          </li>

          <li className="dropdown">
            <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
              MTP<i className="fa fa-angle-down"></i>
            </button>
            <div className="subMenu">
            <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}}  className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.250.253/capex-targets" target='_blank' >
                  Capex Targets
                </a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.251.202:3005/criticalcontractss.aspx" target="_blank">
                  Critical Contracts
                </a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.251.202:3005/citicalspares.aspx" target="_blank">
                  Critical Spares
                </a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.251.202:3005/budget.aspx" target="_blank">
                  Budget
                </a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.251.202:3005/liabilities.aspx" target="_blank">
                  Liabilities List
                </a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="https://ceontpl-my.sharepoint.com/:x:/g/personal/admin_ceontpl_onmicrosoft_com/Ef9dcHCqCshEupjNBinFDWgBmq86hPvSsKdzvkpnzMqOSA?e=Xd0iEZ&nav=MTVfezIyRDhFQzc5LTI0MzctNEY2NS1CNkM1LTI2MUNFRDA0MTIzNn0" target="_blank">
                  Rolling Plan
                </a>
              </button>
            </div>
          </li>

          <li className="dropdown">
            <a style={{ backgroundColor: '#941010' ,color:'white', width : '220px',textAlign:'left'}} href= "/photogallery" className="btn btn-warning btn-sm" target="_blank">
              Photo Gallery <i className="fa fa-angle-down" style={{ visibility: 'hidden' }}></i>
            </a>
            <div className="subMenu">
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.250.253:80/gallerylogin" target="_blank">Upload Photos</a>
              </button>
              </div>
          </li>


           {/* Reports Dropdown */}
           <li className="dropdown">
            <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
              Reports <i className="fa fa-angle-down"></i>
            </button>
            <div className="subMenu">
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.251.202:3005/DPR_Upload_Form/DPRlogin.aspx" target="_blank">Login</a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.251.202:3005/DPR_Upload_Form/ViewDPR.aspx" target="_blank">View DPR</a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.251.202:3005/DPR_Upload_Form/ViewDMR.aspx" target="_blank">View MOM</a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.251.202:3005/DPR_Upload_Form/ViewMOH.aspx" target="_blank">View MOH</a>
              </button>
            </div>
          </li>


          <li className="dropdown">
            <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
              Safety <i className="fa fa-angle-down"></i>
            </button>
            <div className="subMenu">
            <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}}      className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.250.253/safetyforms" target="_blank">Safety Forms</a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.251.202:3005/safety.aspx" target="_blank">Safety Policy</a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.251.202:3005/safetymanual.aspx" target="_blank">Safety Manual</a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.251.202:3005/SOP.aspx" target="_blank">SOP</a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.251.202:3005/safetycommity.aspx" target="_blank">Safety Community Member</a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a style={{color:'white'}} href="http://172.16.251.202:3005/contactus.aspx" target="_blank">Emergency Contact Nos.</a>
              </button>
            </div>
          </li>

          

          {/* <li className="dropdown">
            <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
              SOP<i className="fa fa-angle-down"></i>
            </button>
            <div className="subMenu">
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a href="http://172.16.251.202:3005/boiler.aspx" target="_blank">
                  Boiler
                </a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a href="http://172.16.251.202:3005/turbine.aspx" target="_blank">
                  Turbine
                </a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a href="http://172.16.251.202:3005/generator.aspx" target="_blank">
                  Generator
                </a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a href="http://172.16.251.202:3005/commonsop.aspx" target="_blank">
                  Common SOPs
                </a>
              </button>
            </div>
          </li> */}

<li className="dropdown">
            <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} onClick={() => window.open("http://172.16.250.253/sop", "_blank")} className="btn btn-warning btn-sm">
              SOP's <i className="fa fa-angle-down" style={{ visibility: 'hidden' }}></i>
            </button>
          </li>
          <li className="dropdown">
            <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} onClick={() => window.open("http://172.16.250.253/tripreports", "_blank")} className="btn btn-warning btn-sm">
              Trip Reports <i className="fa fa-angle-down" style={{ visibility: 'hidden' }}></i>
            </button>
          </li>
          {/* Vigilance Link */}
          <li className="dropdown">
            <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} onClick={() => window.open("http://172.16.251.202:3005/vigilance/vigilanceindex.aspx", "_blank")} className="btn btn-warning btn-sm">
              Vigilance <i className="fa fa-angle-down" style={{ visibility: 'hidden' }}></i>
            </button>
          </li>

          {/* <li className="dropdown">
            <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
              Trip Reports<i className="fa fa-angle-down"></i>
            </button>
            <div className="subMenu">
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a href="http://172.16.251.202:3005/tripunit1.aspx" target="_blank">
                  Unit 1
                </a>
              </button>
              <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} className="btn btn-warning btn-sm">
                <a href="http://172.16.251.202:3005/tripunit2.aspx" target="_blank">
                  Unit 2
                </a>
              </button>
            </div>
          </li> */}

          

          

          

          {/* Safety Dropdown */}
          

         

        


          <li className="dropdown">
            <button style={{ backgroundColor: '#941010' ,color:'white',textAlign:'left'}} onClick={() => window.open("http://172.16.250.253:6002/", "_blank")} className="btn btn-warning btn-sm">
              Telephone Directory <i className="fa fa-angle-down" style={{ visibility: 'hidden' }}></i>
            </button>
          </li>

          
         
          

          <li className="dropdown">
            <a style={{ backgroundColor: '#941010' ,color:'white', width : '220px',textAlign:'left'}} href = "http://172.16.251.202:3005/Quicklinks.aspx" className="btn btn-warning btn-sm" target="_blank">
              Quick Links <i className="fa fa-angle-down" style={{ visibility: 'hidden' }}></i>
            </a>
          </li>
          <li className="dropdown">
            <a style={{ backgroundColor: '#941010' ,color:'white',  width : '220px',textAlign:'left'}} href = "http://172.16.251.202:3005/" className="btn btn-warning btn-sm" target="_blank">
              Old Intranet <i className="fa fa-angle-down" style={{ visibility: 'hidden' }}></i>
            </a>
          </li>
        </ul>
      </nav>
    </aside>

        {/* Main Content Section */}
        <MainContent/>

   </div>
      

      {/* Footer Section */}
      <footer  className=" text-white text-center py-3" style={{backgroundColor: '#3674B5'}}>
  <div  className="container">
    <div className="row">
      <div className="col-md-6 mb-3">
        <p><strong>REGISTERED OFFICE</strong></p>
        <p>No-135, EVR Periyar High Road,<br />
           Kilpauk, Chennai-600 010,<br />
           Tamil Nadu, India.</p>
      </div>
      <div className="col-md-6 mb-3">
        <p><strong>TUTICORIN Branch</strong></p>
        <p>NLC Tamilnadu Power Ltd,<br />
           2 x 500 MW Thermal Power Station,<br />
           Harbour Estate, Tuticorin 628 004,<br />
           Tamilnadu, India.</p>
      </div>
    </div>
    <hr className="my-3" />
    <div className="row">
      <div className="col-md-6 mb-3">
        <p>Copyright © NTPL - NLC TamilNadu Power Ltd. All Rights Reserved.</p>
        <p>Designed by NTPL-CS</p>
      </div>
      <div className="col-md-6 mb-3">
        <p>Maintained by Computer Services - NTPL</p>
        <p>Hit Count: {HitCount} | Since: November 2, 2024</p>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
}

export default Main;
