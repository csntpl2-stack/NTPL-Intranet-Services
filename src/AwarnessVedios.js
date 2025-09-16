import React, { useRef } from "react";
import Header from "./Header2";

// Dynamically import all video files from the 'awarenessVideos' folder
const awarenessVideosContext = require.context("./CyberSecurity/AwanessVedios", false, /\.(mp4)$/);

// Extract video file names
const videos = awarenessVideosContext.keys().map((file) => ({
  url: awarenessVideosContext(file),
}));

const CyberAwarenessVideos = () => {
  const videoRefs = useRef([]);

  const togglePlayPause = (index) => {
    const video = videoRefs.current[index];
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const openFullscreen = (index) => {
    const video = videoRefs.current[index];
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen(); // Firefox
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen(); // Chrome, Safari, Opera
    }
  };

  return (
    <div>
        <Header/>
        <div className="text-center bg-primary text-white py-3 rounded mb-4">
        <h2 className="fw-bold">Cyber Awarness Videos</h2>
      </div>
    <div className="container-fluid mt-4">
      <div className="row">
        {videos.map((video, index) => (
          <div key={index} className="col-md-3 mb-4">
            <div className="card">
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                className="card-img-top"
                controls
              >
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default CyberAwarenessVideos;
