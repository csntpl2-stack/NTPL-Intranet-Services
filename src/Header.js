import React from 'react';
import headerimage from './pictures/new_head_ntpl.JPG'
import logo from './pictures/ntpllogo1.png'
import CEO from './pictures/CEO-image.jpg'
import CFO from './pictures/CFO.jpg'
import { useEffect, useState } from "react";

const images = [CEO, CFO];
const names = [
  {name:'Shri. K. Anandaramanujam',designation:'Chief Executive Officer'},
  {name:'Shri. Rajinder Kumar Singh',designation:'Chief Financial Officer'},
];
const Header = ()=>
{
      const [imageSrc,setImageSrc] = useState(0);
      useEffect(() => {
        const interval = setInterval(() => {
          setImageSrc((prevIndex) => (prevIndex + 1) % images.length);
        }, 3500);
    
        return () => clearInterval(interval); // Cleanup interval on component unmount
      }, []);
      
    return(
        <div style={{ margin: 0, padding: 0 ,backgroundColor:'#155E95',height:'auto'}} class="container-fluid py-3">
        <div class="row align-items-center">
        <div class="col-md-3 text-center image-container">
        <img src={images[imageSrc]} alt="Left Image" class="img-fluid" style={{ width: '150px', height: '150px', margin: 0, padding: 0 }} />
         <p   style={{ margin: 0, padding: 0 , color:'white' }}><strong>{names[imageSrc].name}</strong></p>
          <p  style={{ margin: 0, padding: 0 , color:'white'}}><strong>{names[imageSrc].designation}</strong></p>
           </div>
          <div class="col-md-6 text-center">
            <h1 class="header-title mb-1" style={{color:'#FFA500'}}>NLC Tamilnadu Power Limited</h1>
            <p class="header-subtitle mb-0" style={{color:'#C0C0C0'}}>
              A JV Company of <span   style={{color:'#C0C0C0'}}>NLC India Ltd.</span> & 
              <span  style={{color:'#C0C0C0'}}>TNPGCL</span> and
            </p>
            <p   style={{color:'#C0C0C0'}}>
              A Subsidiary of <span   style={{color:'#C0C0C0'}}>NLC India Limited</span>.
            </p>
            <h4 style={{textAlign:'center',color:'#FFD700',marginTop:'0px',marginBottom:'0px'}}> INTRANET SERVICES</h4>
          </div>
          <div class="col-md-3 text-center logo-container">
            <img style={{width:'200px',height:'200px', marginLeft : '10px'}} src={logo} alt="Company Logo" class="img-fluid" />
          </div>
        </div>
      </div>
    );
};

export default Header;
