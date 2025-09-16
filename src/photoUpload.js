import { useState, useEffect } from "react";

const API_URL = "http://172.16.251.202:5006"; // Adjust the URL to your backend server

const ImageUploadPage = () => {
  const [image, setImage] = useState(null);
  const [eventName, setEventName] = useState("");
  const [eventSuggestions, setEventSuggestions] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch event names from the server
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_URL}/events`);
        const data = await response.json();
        setEventSuggestions(data);
      } catch (error) {
        console.error("Error fetching event names:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleEventChange = (e) => {
    const value = e.target.value;
    setEventName(value);

    // Filter suggestions based on input
    const filtered = eventSuggestions.filter((event) =>
      event.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredEvents(filtered);
    setShowDropdown(filtered.length > 0);
  };

  const selectEvent = (event) => {
    setEventName(event);
    setShowDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("event_name", eventName);
    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData, // Do not manually set the Content-Type header
      });

      const data = await response.json();
      if (data.success) {
        setMessage(`Image uploaded successfully!`);
      } else {
        setMessage("Image upload failed");
      }
    } catch (error) {
      console.error("Error during image upload:", error);
      setMessage("Image upload failed");
    } finally {
      setIsLoading(false);
      setImage(null);
      setEventName("");
    }
  };

  return (
    <div className="container mt-4">
      <div className="text-center bg-primary text-white py-3 rounded mb-4">
        <h2 className="fw-bold">Upload Image</h2>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Event Name Input with Autocomplete */}
        <div className="mb-3 position-relative">
          <label htmlFor="eventName" className="form-label">
            Event Name
          </label>
          <input
            type="text"
            className="form-control"
            id="eventName"
            value={eventName}
            onChange={handleEventChange}
            required
            autoComplete="off"
          />
          {showDropdown && (
            <ul className="list-group position-absolute w-100" style={{ zIndex: 1000 }}>
              {filteredEvents.map((event, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action"
                  onClick={() => selectEvent(event)}
                  style={{ cursor: "pointer" }}
                >
                  {event}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Image Upload Input */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Choose an Image
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>

        {/* Image Preview */}
        {image && (
          <div className="mb-3">
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              style={{ width: "200px", height: "auto", objectFit: "cover" }}
            />
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* Status Message */}
      {message && (
        <div className={`mt-4 alert ${message.includes("failed") ? "alert-danger" : "alert-success"}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default ImageUploadPage;
