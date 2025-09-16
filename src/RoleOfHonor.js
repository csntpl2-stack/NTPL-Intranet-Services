import React from 'react';
import Header from './Header2'
import img1 from './CEO photos/1.png'
import img2 from './CEO photos/2.png'
import img3 from './CEO photos/3.png'
import img4 from './CEO photos/4.png'
import img5 from './CEO photos/5.png'
import img6 from './CEO photos/6.png'
import img7 from './CEO photos/7.png'
import img8 from './CEO photos/8.png'
import img9 from './CEO photos/9.png'
import img10 from './pictures/CEO-image.jpg'


const ImageDetailsGrid = () => {
  const images = [
    {
      src: img10,
      name: 'ANANDARAMANUJAM K',
      position: 'CHIEF EXECUTIVE OFFICER - NTPL',
      period:'From 30.04.2023'
    },
    {
      src: img9,
      name: 'Kondas Kumar K',
      position: 'CHIEF EXECUTIVE OFFICER - NTPL',
      period:'From 01.03.2022 To 29.04.2023'
    },
    {
      src: img8,
      name: 'K. S. GOPALAKRISHNAN',
      position: 'CHIEF EXECUTIVE OFFICER - NTPL',
      period:'From 20.02.2019 To 28.02.2022 '
    },
    {
      src: img7,
      name: 'SHAJI JOHN',
      position: 'CHIEF EXECUTIVE OFFICER - NTPL',
      period:'From 01.04.2018 To 20.02.2019'
    },
    {
      src: img6,
      name: 'M. PRABHAGAR',
      position: 'CHIEF EXECUTIVE OFFICER - NTPL',
      period:'From 01.03.2017 To 31.03.2018'
    },
    {
      src: img4,
      name: 'A. R. NEELAKANTA PILLAI',
      position: 'CHIEF EXECUTIVE OFFICER - NTPL',
      period:'From 01.05.2016 To 28.02.2017'
    },
    {
      src:img5,
      name: 'S. SATHIYANARAYANAN',
      position: 'CHIEF EXECUTIVE OFFICER - NTPL',
      period:'From 01.04.2015 To 30.04.2016'
    },
    {
      src: img3,
      name: 'C. RAMACHANDRAN',
      position: 'CHIEF EXECUTIVE OFFICER - NTPL',
      period:'From 01.03.2013 To 31.03.2015'
    },
    {
      src: img2,
      name: 'S. RAJAGOPAL',
      position: 'CHIEF EXECUTIVE OFFICER - NTPL',
      period:'From 01.10.2011 To 28.02.2013'
    },
    {
      src: img1,
      name: 'S. RAJAGOPAL',
      position: 'CHIEF EXECUTIVE OFFICER - NTPL',
      period:'From 03.06.2009 To 30.09.2011'
    }
  ];

  return (
    <div>
      <Header/>
      <div className="container mt-5">
        <h3 className='App'>Role of Honor</h3>
        <div className="row">
        <div className="container mt-4 p-4"
  style={{
    backgroundColor: '#faf3e0',
    border: '10px solid #d4af37',  // Gold outer border
    borderRadius: '20px',
    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
    padding: '20px',
    textAlign: 'center',
    position: 'relative',
  }}
>
  {images.map((image, index) => (
    <div key={index} className="col-12 mb-4">
      <div className="d-flex align-items-center justify-content-center">
        
        {/* Image Section with Frame Effect */}
        <div
          className="me-4 p-2"
          style={{
            border: '10px solid white',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
            borderRadius: '10px',
            backgroundColor: '#fff',
            transition: 'transform 0.3s ease-in-out',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <img
            src={image.src}
            alt={image.title}
            style={{
              width: '250px',
              height: '270px',
              objectFit: 'cover',
              borderRadius: '5px',
            }}
          />
        </div>

        {/* Details Section */}
        <div style={{ textAlign: 'center', flex: 1 }}>
          <h5 style={{ marginTop: '20px', fontWeight: 'bold', color: '#222' }}>{image.name}</h5>
          <p style={{ fontSize: '16px', color: '#444', fontWeight: 'bold' }}>{image.position}</p>
          <p style={{ fontSize: '16px', color: '#444', fontWeight: 'bold' }}>{image.period}</p>
        </div>
      </div>
      <hr style={{ borderTop: '5px dashed #aaa' }} />
    </div>
  ))}
</div>
        </div>
      </div>
    </div>
  );
};

export default ImageDetailsGrid;
