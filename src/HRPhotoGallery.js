import { useEffect, useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; 
import Header from "./Header2";
import { useLocation } from "react-router-dom";

const API_URL = "http://172.16.251.202:5006";

const HRPhotoGallery = () => {
  const [images, setImages] = useState([]);
  const [events, setEvents] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedPic = queryParams.get("selectedpic");
  console.log(selectedPic);
  
  const [selectedEvent, setSelectedEvent] = useState(selectedPic ? selectedPic : "All");
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_URL}/hrevents`);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching event names:", error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          selectedEvent === "All" ? `${API_URL}/hrphotos` : `${API_URL}/hrphotos?event=${selectedEvent}`
        );
        const data = await response.json();
        setImages(data);
        if(data.length <= 0){
          const response = await fetch(`${API_URL}/hrphotos`);
          const data1 = await response.json();
          setImages(data1)
        }
        
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, [selectedEvent]);

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  return (
    <div>
      <Header />
      <div className="container-fluid mt-4">
        {/* Page Header */}
        <div className="text-center bg-primary text-white py-3 rounded mb-4">
          <h2 className="fw-bold">CSR Photo Gallery</h2>
        </div>

        <div className="row">
          {/* Event Buttons Sidebar */}
          <div className="col-md-3">
            <div className="d-flex flex-column">
              <button 
                className={`btn ${selectedEvent === "All" ? "btn-primary" : "btn-outline-primary"} mb-2`} 
                onClick={() => setSelectedEvent("All")}
              >
                All Events
              </button>
              {events.map(event => (
                <button 
                  key={event} 
                  className={`btn ${selectedEvent === event ? "btn-primary" : "btn-outline-primary"} mb-2`} 
                  onClick={() => setSelectedEvent(event)}
                >
                  {event}
                </button>
              ))}
            </div>
          </div>

          {/* Image Grid */}
          <div className="col-md-9">
            <div className="row">
              {images.length > 0 ? (
                images.map((img, index) => (
                  <div key={img.id} className="col-md-4 mb-4">
                    <div className="card shadow-lg">
                      <img 
                        src={img.image} 
                        alt={img.event_name} 
                        className="card-img-top rounded cursor-pointer" 
                        style={{ height: "350px", objectFit: "cover", cursor: "pointer" }}
                        onClick={() => openLightbox(index)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted">No images found.</p>
              )}
            </div>
          </div>
        </div>

        {/* Image Lightbox */}
        {isOpen && images.length > 0 && (
          <Lightbox
            mainSrc={images[photoIndex].image}
            nextSrc={images[(photoIndex + 1) % images.length]?.image}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]?.image}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + images.length - 1) % images.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % images.length)
            }
          />
        )}
      </div>
    </div>
  );
};

export default HRPhotoGallery;
