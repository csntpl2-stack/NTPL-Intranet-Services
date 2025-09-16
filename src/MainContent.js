import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Performace from './PerformanceMetrics';
import CoalDataTable from './CoalData';
import Thirukkural from './Thirukkural.json'
import Modal from './Modal';
import posterImage from './Posters/Vigilance Awareness Campaign 2025.jpeg'
import './maincontent.css'
import axios from 'axios';

function Main() {

    const [images, setImages] = useState([]);
    const [currentTime, setCurrentTime] = useState('');
    const [data, setData] = useState([]); 
    const [quote, setQuote] = useState('');
    const [word, setWord] = useState('Namak');
    const [meaning, setMeaning] = useState('Salt');
    const [imageNames, setImageNames] = useState([]);
    const [circulars, setCirculars] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [kural, setKural] = useState({ line1: '', line2 : '', meaning: '', tamilmeaning: ''});
    const [wordData, setWordData] = useState([]);

    const [grossData, setGrossData] = useState({});
    const [showPosterModal, setPosterShowModal] = useState(true);

    useEffect(() => {
      fetch('http://172.16.250.253:5006/api/quote')
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (Array.isArray(data) && data.length > 0) {
            setQuote(`${data[0].q} — ${data[0].a}`);
          } else {
            setQuote(null);
          }
        })
        .catch((err) => {
          console.error('Failed to fetch quote:', err);
          setQuote(null);
        });
    }, []);

    useEffect(() => {
      const todayIndex = new Date().getDate() % Thirukkural.length;
      setKural({
        line1 : Thirukkural[todayIndex]['line1'],
        line2 : Thirukkural[todayIndex]['line2'],
        meaning : Thirukkural[todayIndex]['meaning'],
        tamilmeaning: Thirukkural[todayIndex]['tamilmeaning']
      })
      // setKural(Thirukkural[todayIndex]['kural']);
    }, []);

    useEffect(() => {
      // Function to dynamically fetch the current time
      const updateTime = () => {
        const now = new Date();
        const formattedTime = now.toLocaleString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true, // Display in AM/PM format
        });
        setCurrentTime(formattedTime);
      };

  
      // Fetch data from the API
      const fetchData = async () => {
        try {
          const response = await fetch('http://172.16.250.253:5005/api/data');
          const result = await response.json();
          setData(result); 
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      
  
      // Call the functions
      updateTime();
      fetchData();
       // Fetch the data on component mount
  
      // Update time every second
      const intervalId = setInterval(updateTime, 1000);
      // Cleanup interval when component unmounts
      return () => clearInterval(intervalId);
    }, [currentTime]); // Empty dependency array ensures this runs once after component mount

    useEffect(() => {
      const fetchGrossGenerationData = async () => {
        try {
          const response = await fetch("http://172.16.251.202:5006/get_today_gross_generation");
          const result = await response.json();
          
          if (result.success && result.data.length > 0) {
            setGrossData(result.data[0]);
            
          }
        } catch (err) {
          console.log("Failed to fetch data",err);
          
          
        } 
      };
      fetchGrossGenerationData();
      
    }, []);
    
    useEffect(() => {
      const fetchCirculars = async () => {
        try {
          const response = await fetch("http://172.16.250.253:5006/circulars");
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
    
          // Sort circulars by Upload_Date in descending order (latest first)
          const sortedCirculars = data.sort(
            (a, b) => new Date(b.Upload_Date) - new Date(a.Upload_Date)
          );
    
          // Get the latest 5 circulars
          const latestCirculars = sortedCirculars.slice(0, 7);
    
          setCirculars(latestCirculars);
        } catch (error) {
          console.error("Error fetching circulars:", error);
        }
      };

      /* const fetchQuote = async () => {
        try {
          const response = await fetch("https://api.allorigins.win/raw?url=https://zenquotes.io/api/today");
          const data = await response.json();
          if (data && data.length > 0) {
            setQuote(`${data[0].q} - ${data[0].a}`);
          }
        } catch (error) {
          console.error("Error fetching quote:", error);
        }
      }; */

      /* const fetchWord = async () => {
        try {
          const response = await fetch("https://api.allorigins.win/raw?url=https://api.dictionaryapi.dev/api/v2/entries/hi/???");
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          if (data && data.length > 0) {
            setWord(data[0].word);
            setMeaning(data[0].meanings[0].definitions[0].definition);
          }
        } catch (error) {
          console.error("Error fetching Hindi word:", error);
        }
      };*/
    
      fetchCirculars();
      // fetchQuote();
      // fetchWord();
    }, []);

    const API_URL = "http://172.16.251.202:5009/api/hindi-word";

  // Utility: get today's date in YYYY-MM-DD format
  const getToday = () => new Date().toISOString().split("T")[0];

  // Function to fetch and store word
  const fetchWord = async () => {
    try {
      const response = await axios.get(API_URL);
      setWordData(response.data);
      localStorage.setItem("hindiWordData", JSON.stringify(response.data));
      localStorage.setItem("hindiWordDate", getToday());
    } catch (error) {
      console.error("Error fetching Hindi word:", error);
    } 
  };

  useEffect(() => {
    const storedData = localStorage.getItem("hindiWordData");
    const storedDate = localStorage.getItem("hindiWordDate");

    if (storedData && storedDate === getToday()) {
      setWordData(JSON.parse(storedData));
      // setLoading(false);
    } else {
      fetchWord();
    }

    // ⏰ Check every 1 hour if the date has changed
    const interval = setInterval(() => {
      const currentDate = getToday();
      const savedDate = localStorage.getItem("hindiWordDate");
      if (savedDate !== currentDate) {
        // New day → fetch fresh word
        fetchWord();
      }
    }, 60 * 60 * 1000); // every 1 hour

    return () => clearInterval(interval);
  }, []);

  useEffect(()=>{
    console.log("wordData",wordData);
  },[wordData])
    

    useEffect(() => {
        // Function to dynamically import images (only once)
        const importImages = () => {
          const context = require.context('./LatestEvents', false, /\.(jpg|jpeg|png|gif)$/); // Adjust file types as needed
          const imagesList = context.keys().map(context); // Dynamically require images

          const namesList = context.keys().map((key) => {
            const parts = key.split('/'); // Split path
            return parts[parts.length - 1]; // Get the last part (filename)
          });
    
          setImageNames(namesList); 
          setImages(imagesList);
        };
    
        importImages(); // Fetch images once on component mount
      }, []);

      const handlePerformaceButtonClick = () => {
        setShowModal(true);
      };
    
      // Function to close the modal
      const closeModal = () => {
        setShowModal(false);
      };

      function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      }


    return(
        <main style={{width:'80%'}} className="col-md-9 py-3">

       <Modal
        show={showPosterModal}
        onClose={() => setPosterShowModal(false)}
        content={posterImage}
        isPoster={true}
      />

{showModal && (
        <div  className="modal-overlay">
          <div style={{width:"65%"}} className="modal-content">
            <button className="close-btn" onClick={closeModal}>Close</button>
            <Performace/>
          </div>
        </div>
      )}
       <div className="row">
  {/* ESS/MSS Section */}
  <section className="col-md-6 mb-4 p-3 bg-white border rounded shadow position-relative">

  {/* Heading with Button */}
  <h5 style={{ 
    backgroundColor: '#3674B5', 
    padding: '5px', 
    borderRadius: '8px', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginTop: '5px',
    color: 'white'
  }}>
    EMS
    <button
      onClick={() => window.open("http://172.16.250.253:3000/", "_blank")}
      className="btn fw-bold"
      style={{ width: "20%", color: 'white' }}
    >
      Login
    </button>
  </h5>

  {/* Image with Centered Text */}
  {/* <Link to={'http://172.16.250.253:3014/'} target='_blank'>
  <div
    className="position-relative text-center"
    style={{
      backgroundImage: `url(${bgImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width: '50%',   
      height: '110px',
      borderRadius: '8px',
      marginTop: '1px',
      marginLeft:'130px',
      backgroundSize:'160px'
    }}
  > */}
    

    {/* Centered Text */}
   {/*  <div className="position-absolute top-50 start-50 translate-middle">
      <p style={{ color: '#FFF', fontSize: '10px', fontWeight: '600' }}>
      CONTRACTS AND PURCHASE UPDATES
      </p>
    </div>
  </div>
  </Link> */}
  
<div className="d-flex justify-content-center mt-3">
<Link to={'http://172.16.251.202:3014/'} target='_blank' style={{textDecoration: 'none'}}>
  <button  className="c-button c-button--gooey" style={{ height: '56px', marginLeft: '10px', backgroundColor: '#06c8d9'}}>
    Tender Updates  <span className="badge bg-danger ms-2">New</span>
    <div className="c-button__blobs">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </button>
  </Link>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ display: 'block', height: 0, width: 0 }}>
    <defs>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
        <feBlend in="SourceGraphic" in2="goo" />
      </filter>
    </defs>
  </svg>

  <Link to={'http://172.16.251.202/ai-for-engineers'} target='_blank' style={{textDecoration: 'none'}}>
  <button  className="c-button c-button--gooey" style={{ height: '56px', marginLeft: '10px', backgroundColor: '#06c8d9'}}>
    AI Tools <br/> <span className="badge bg-danger ms-2">New</span>
    <div className="c-button__blobs">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </button>
  </Link>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ display: 'block', height: 0, width: 0 }}>
    <defs>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
        <feBlend in="SourceGraphic" in2="goo" />
      </filter>
    </defs>
  </svg>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ display: 'block', height: 0, width: 0 }}>
    <defs>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
        <feBlend in="SourceGraphic" in2="goo" />
      </filter>
    </defs>
  </svg>
  
</div>





</section>


              {/* Power Generation Section */}
              <section className="col-md-6 mb-4 p-3 bg-white border rounded shadow">
  <h5  style={{ 
             backgroundColor: '#3674B5', 
             padding: '5px', 
             borderRadius: '8px', 
             display: 'flex', 
             justifyContent: 'space-between', 
             alignItems: 'center',
             marginTop:'5px',
             color:'white' 

             }} className="text-center mb-3 "><span>Power Generation</span>
             
             <span className="text-whte" style={{fontSize: '14px', marginLeft: 'auto'}}>
             Last Update as on: <span id="updateTime">{currentTime}</span>
           </span></h5>
  <div className="table-responsive">
    <table className="table table-bordered text-center">
      <thead className="bg-primary text-white">
        <tr>
          <th style={{backgroundColor:'#198754', color:'white'}} >SCHEDULE MW</th>
          <th style={{backgroundColor:'#198754', color:'white'}} >UNIT-I MW</th>
          <th style={{backgroundColor:'#198754', color:'white'}} >UNIT-II MW</th>
          <th style={{backgroundColor:'#198754', color:'white'}} >TOTAL MW</th>
          <th style={{backgroundColor:'#198754', color:'white'}} >EXPORT MW</th>
          <th style={{backgroundColor:'#198754', color:'white'}} >FREQUENCY HZ</th>
        </tr>
      </thead>
      <tbody>
        <tr className="">
          <td style={{backgroundColor:'#E0FBE2', color:'black'}}>{data.SCH}</td>
          <td style={{backgroundColor:'#E0FBE2', color:'black'}}>{data.NTPL_Unit1}</td>
          <td style={{backgroundColor:'#E0FBE2', color:'black'}}>{data.NTPL_Unit2}</td>
          <td style={{backgroundColor:'#E0FBE2', color:'black'}}>{(Number(data.NTPL_Unit2) + Number(data.NTPL_Unit1)).toFixed(2)}</td>
          <td style={{backgroundColor:'#E0FBE2', color:'black'}}>{data.EXPORT}</td>
          <td style={{backgroundColor:'#E0FBE2', color:'black'}}>{data.FREQ}</td>
        </tr>
      </tbody>
    </table>
  </div>
  
</section>
            </div>
          <div className="row">

          <section className="col-md-6 mb-4 p-3 bg-white border rounded shadow">
            {/* Gross Generation Table style={{ backgroundColor: "#3674B5",color:'white',padding: '5px', 
             borderRadius: '8px',}} style={{backgroundColor:'#198754', color:'white'}} style={{backgroundColor:'#E0FBE2', color:'black'}} */}
                <div style={{ paddingTop: "0px" }} className="mt-4">
              <table style={{ borderSpacing: '15px' }} className="table table-bordered">
                <thead>
                  <tr className="text-white" style={{ backgroundColor: "#4CAF50" }}>
                    <th
                      style={{ backgroundColor: "#3674B5", position: "relative" }}
                      colSpan="5"
                      className="btn-success text-white text-center"
                    >
                      Gross Generation:{" "}
                      {(() => {
                        const date = new Date(grossData.EntryDate);
                        const day = date.getUTCDate().toString().padStart(2, '0');
                        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
                        const year = date.getUTCFullYear();
                        return `${day}-${month}-${year}`;
                      })()}
                      <span
                        className="text-white"
                        style={{ position: "absolute", right: "10px" }}
                      >
                        <a onClick={() => navigate("/update-gross-generation")}>Update</a>
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th className="text-center" style={{ backgroundColor: '#198754', color: 'white' }}>Period</th>
                    <th className="text-center" style={{ backgroundColor: '#198754', color: 'white' }}>Target MU</th>
                    <th className="text-center" style={{ backgroundColor: '#198754', color: 'white' }}>Actual MU</th>
                    <th className="text-center" style={{ backgroundColor: '#198754', color: 'white' }}>Average PAF</th>
                    <th className="text-center" style={{ backgroundColor: '#198754', color: 'white' }}>Average PLF</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center" style={{ backgroundColor: '#E0FBE2', color: 'black' }}>Day</td>
                    <td className="text-center" style={{ backgroundColor: '#E0FBE2', color: 'black' }}>{grossData.DayTargetMU}</td>
                    <td className="text-center" style={{ backgroundColor: '#E0FBE2', color: 'black' }}>{grossData.DayActualMU}</td>
                    <td className="text-center" style={{ backgroundColor: '#E0FBE2', color: 'black' }}>{grossData.DayPAF}</td>
                    <td className="text-center" style={{ backgroundColor: '#E0FBE2', color: 'black' }}>{grossData.DayPLF}</td>
                  </tr>
                  <tr>
                    <td className="text-center" style={{ backgroundColor: '#E0FBE2', color: 'black' }}>Month</td>
                    <td className="text-center" style={{ backgroundColor: '#E0FBE2', color: 'black' }}>{grossData.MonthTargetMU}</td>
                    <td className="text-center" style={{ backgroundColor: '#E0FBE2', color: 'black' }}>{grossData.MonthActualMU}</td>
                    <td className="text-center" style={{ backgroundColor: '#E0FBE2', color: 'black' }}>{grossData.MonthPAF}</td>
                    <td className="text-center" style={{ backgroundColor: '#E0FBE2', color: 'black' }}>{grossData.MonthPLF}</td>
                  </tr>
                  <tr>
                    <td className="text-center" style={{ backgroundColor: '#E0FBE2', color: 'black' }}>Quarter</td>
                    <td className="text-center" style={{ backgroundColor: '#E0FBE2', color: 'black' }}>{grossData.QuarterTargetMU}</td>
                    <td className="text-center" style={{ backgroundColor: '#E0FBE2', color: 'black' }}>{grossData.QuarterActualMU}</td>
                    <td className="text-center" style={{ backgroundColor: '#E0FBE2', color: 'black' }}>{grossData.QuarterPAF}</td>
                    <td className="text-center" style={{ backgroundColor: '#E0FBE2', color: 'black' }}>{grossData.QuarterPLF}</td>
                  </tr>
                  <tr>
                    <td className="text-center" style={{ backgroundColor: '#E0FBE2', color: 'black' }}>Year</td>
                    <td className="text-center" style={{ backgroundColor: '#E0FBE2', color: 'black' }}>{grossData.YearTargetMU}</td>
                    <td className="text-center" style={{ backgroundColor: '#E0FBE2', color: 'black' }}>{grossData.YearActualMU}</td>
                    <td className="text-center" style={{ backgroundColor: '#E0FBE2', color: 'black' }}>{grossData.YearPAF}</td>
                    <td className="text-center" style={{ backgroundColor: '#E0FBE2', color: 'black' }}>{grossData.YearPLF}</td>
                  </tr>
                </tbody>
              </table>
              <button onClick={handlePerformaceButtonClick} style={{ width: "20%", marginLeft: '40%' }} className='btn btn-success btn-sm'>Performance Details</button>
            </div>

          <h5 style={{ 
             backgroundColor: '#3674B5', 
             padding: '5px', 
             borderRadius: '8px', 
             display: 'flex', 
             justifyContent: 'space-between', 
             alignItems: 'center',
             marginTop:'25px',
             color:'white' 

             }}>
             Circulars
             <span onClick={() => navigate("/circulars")} style={{ fontSize: '15px',marginRight:'5px' }}>Archives</span>
         </h5>
  <div className="table-responsive">
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Circular Name</th>
        </tr>
      </thead>
      <tbody>
        {circulars.map((circular, index) => (
          <tr key={index}>
            <td>{formatDate(circular.Upload_Date)}</td>
            <td>{circular.Division}</td>
            <td>
            <a
               href={`data:${circular.ContentType};base64,${circular.Data}`}
               download={circular.Filename}
               style={{color:'#0044ff'}}
                >
                {circular.Description}
                 <span className="badge bg-danger ms-2">New</span>
              </a>
            </td>
            
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>



            {/* Latest Events Section */}
            <section  className="col-md-6 mb-4 p-3 bg-white border rounded shadow" style={{ minHeight: '400px'}}>
            <CoalDataTable/>
    <h5 style={{ 
             backgroundColor: '#3674B5', 
             padding: '5px', 
             borderRadius: '8px', 
             display: 'flex', 
             justifyContent: 'space-between', 
             alignItems: 'center',
             marginTop:'5px',
             color:'white' ,
             marginTop:'40px'

             }}>Latest Events</h5>
    <div id="eventCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {images.map((image, index) => (
          <Link to={`/photogallery?selectedpic=${imageNames[index].replace(/\.[^/.]+$/, "")}`}>
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
            <div className="card" style={{ height: '410px', overflow: 'hidden' }}>
              <div style={{ height: '370px', overflow: 'hidden' }}>
                <img className="d-block w-100 img-fluid" src={image} alt={imageNames[index]} style={{ height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="card-body text-center p-2">
                <p className="card-text" style={{ fontSize: '1rem', fontWeight: '500' }}>{imageNames[index].replace(/\.[^/.]+$/, "")}</p>
              </div>
            </div>
          </div>
          </Link>
        ))}
      </div>

      {/* Carousel Controls */}
      <button className="carousel-control-prev" type="button" data-bs-target="#eventCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#eventCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
    
    
  </section>
                  </div>
            
                  <div className="row">
                     {/* Quick Links Section */}
                     <section className="col-md-6 mb-4 p-3 bg-white border rounded shadow">
  {/* Quick Links Section */}
  <div className="mb-4">
    <h5 style={{ 
             backgroundColor: '#3674B5', 
             padding: '5px', 
             borderRadius: '8px', 
             display: 'flex', 
             justifyContent: 'space-between', 
             alignItems: 'center',
             marginTop:'5px',
             color:'white' 

             }}>Quick Links</h5>
    <ul className="list-group">
      <li className="list-group-item">
        <a style={{ textDecoration: 'none', color: 'inherit',color:'red' }} href='http://172.16.250.253:3000/birthday'>Birthday Wishes</a>
      </li>
      <li className="list-group-item">
        <a style={{ textDecoration: 'none', color: 'inherit',color:'red' ,cursor: "pointer"}} onClick={() => navigate('/roleofhonor')} >Role of Honor</a>
      </li>
      <li className="list-group-item">
        <a style={{ textDecoration: 'none', color: 'inherit',color:'red' }} href='http://nlcui5.nlcindia.com/essmss/'>NLC ESS/MSS</a>
      </li>
      <li className="list-group-item">
        <a style={{ textDecoration: 'none', color: 'inherit',color:'red' }} href='http://ams.nlcindia.com/webams/'>AMS</a>
      </li>
      <li className="list-group-item">
        <a style={{ textDecoration: 'none', color: 'inherit',color:'red' }} href='https://eoffice.nlcindia.com/SSOComponent/auth.php'>E-office</a>
      </li>
      <li className="list-group-item">
        <a style={{ textDecoration: 'none', color: 'inherit',color:'red' }} href='https://email.gov.in/'>NIC Email</a>
      </li>
      <li className="list-group-item">
        <a style={{ textDecoration: 'none', color: 'inherit',color:'red' }} href='https://procure.nlcindia.com/'>Neat</a>
      </li>
    </ul>
  </div>

  {/* Helpline Section */}
  <div>
  <h5
    style={{
      backgroundColor: '#3674B5',
      padding: '5px',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '5px',
      color: 'white'
    }}
  >
    Helpline
  </h5>
  
  <div className="row">
    {/* First Column */}
    <div className="col-md-6">
      <ul className="list-group">
        <li className="list-group-item">
          <strong>Dispensary: </strong> <a style={{ textDecoration: 'none', color: 'inherit' }}>6660</a>
        </li>
        <li className="list-group-item">
          <strong>Safety: </strong> <a style={{ textDecoration: 'none', color: 'inherit' }}>6000</a>
        </li>
        <li className="list-group-item">
          <strong>Computer Services: </strong> <a style={{ textDecoration: 'none', color: 'inherit' }}>6299</a>
        </li>
        <li className="list-group-item">
          <strong>UCB: </strong> <a style={{ textDecoration: 'none', color: 'inherit' }}>6200</a>
        </li>
      </ul>
    </div>

    {/* Second Column */}
    <div className="col-md-6">
      <ul className="list-group">
        <li className="list-group-item">
          <strong>Fire Station: </strong> <a style={{ textDecoration: 'none', color: 'inherit' }}>6100/6101</a>
        </li>
        <li className="list-group-item">
          <strong>CISF(Main Gate): </strong> <a style={{ textDecoration: 'none', color: 'inherit' }}>6281/6289</a>
          <br/>
          <strong>CISF(Rear Gate): </strong> <a style={{ textDecoration: 'none', color: 'inherit' }}>6284</a>
        </li>
        <li className="list-group-item">
          <strong>HR: </strong> <a style={{ textDecoration: 'none', color: 'inherit' }}>6090</a>
        </li>
        <li className="list-group-item">
          <strong>Occupational Health Centre: </strong> <a style={{ textDecoration: 'none', color: 'inherit' }}>6300</a>
        </li>
      </ul>
    </div>
  </div>
</div>

</section>  
<div className="col-md-6 mb-4">
  <div className="d-flex flex-column gap-3">
  <div className="p-3 bg-white border rounded shadow">
  <h5 style={{ 
    backgroundColor: '#3674B5', 
    padding: '5px', 
    borderRadius: '8px', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginTop: '5px',
    color: 'white' 
  }}>
    Thirukkural
  </h5>
  <hr />
  <div 
    style={{ 
      backgroundImage: `url('/olai suvadi.png')`, 
      backgroundSize: '120%', // ZOOMED-IN
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat',
      padding: '40px 30px', // extra padding for better fit
      minHeight: '250px', // ensures enough space for text
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}
  >
    <p style={{ fontWeight: 'bold' }}>
      "{kural.line1}<br/>
      <span style={{ marginLeft: '7px' }}>{kural.line2}</span>"
    </p>
    <p><strong>பொருள் : </strong>{kural.tamilmeaning}</p>
    <p><strong>Translation : </strong>{kural.meaning}</p>
  </div>
</div>

    <div className="p-3 bg-white border rounded shadow">
      <h5 style={{ 
             backgroundColor: '#3674B5', 
             padding: '5px', 
             borderRadius: '8px', 
             display: 'flex', 
             justifyContent: 'space-between', 
             alignItems: 'center',
             marginTop:'5px',
             color:'white' 

             }}>Quote of the Day</h5>
      <hr />
          <p style={{
      fontFamily: "'Dancing Script', cursive",
      fontSize: '1.4rem',
      lineHeight: '1.6',
      fontWeight: '500',
      fontStyle: 'italic',
      padding: '10px',
      backgroundColor: '#fff8dc',
      borderLeft: '5px solid #f4d03f'
    }}>
          <strong>{quote || "Get smart! Use safety from the start."}</strong>
        </p>

    </div>
    <div
      className="p-3 bg-white border rounded shadow"
      
    >
      {/* Header */}
      <h5
        style={{
          background: "linear-gradient(90deg, #3674B5, #28527a)",
          padding: "6px 15px",
          borderRadius: "10px",
          color: "white",
          textAlign: "center",
          fontWeight: "600",
          letterSpacing: "0.5px",
        }}
      >
       Hindi Word of the Day 
      </h5>

      <hr />

      {/* Hindi Word */}
      {/* <p className="mb-2" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
        Hindi Word:{" "}
        <span style={{ fontWeight: "normal", color: "#333" }}>
          {wordData.hindi_word}
        </span>
      </p> */}

        <span style={{ fontWeight: "normal", color: "#444" }}>
        <span  style={{ fontWeight: "normal", color: "blue" }}>{wordData.hindi_word}</span> | {wordData.english_word}
        </span>
      {/* English Word */}
      {/* <p className="mb-2" style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
        English:{" "}
        <span style={{ fontWeight: "normal", color: "#444" }}>
          {wordData.english_word}
        </span>
      </p> */}

      {/* Meaning */}
      <p className="mb-2" style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
        Meaning:{" "}
        <span style={{ fontWeight: "normal", color: "#444" }}>
          {wordData.meaning} {wordData.tamil_word}
        </span>
      </p>

      {/* Tamil Transliteration */}
      {/* <p className="mb-2" style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
        Tamil Transliteration:{" "}
        <span style={{ fontWeight: "normal", color: "#444" }}>
          {wordData.tamil_transliteration}
        </span>
      </p> */}

      {/* Tamil Word */}
     {/*  <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
        Tamil Word:{" "}
        <span style={{ fontWeight: "normal", color: "#444" }}>
          {wordData.tamil_word}
        </span>
      </p> */}
    </div>
  </div>
</div>
</div>
                </main>



    )
}

export default Main;