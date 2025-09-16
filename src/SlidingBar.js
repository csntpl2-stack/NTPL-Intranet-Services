import React from "react";
import { useNavigate } from "react-router-dom";

const newsLinks = [
  { text: "NTPL Knowldege Sharing Workshop Registration Link", url: "https://docs.google.com/forms/d/e/1FAIpQLScRfx2yMenNa7l0FJ2rzLQnaLGd7MrrJBnpwJriZ8BlRg8Yhw/viewform?usp=send_form" , external: true },
  { text: "SOP for Visitor Pass Management", url: "https://drive.google.com/file/d/1RKH-q4lQvJYQ0sU5PKIiIaMHbgwbM_zM/view?usp=drive_link" , external: true },
  { text: "Cyber Security Circulars", url: "/cybersecurity" },
  { text: "Contract and Purchase Forms", url: "/purchaseforms" },
  { text: "Vigilance Study on Tender Process", url: "http://172.16.250.253:81/documents/2024/Circulars%20Hosting/Vigilance%20Study%20on%20Tender%20Process.pdf", external: true },
  { text: "Guidelines for Flexible Operation of Coal Fired Power Plants in India", url: "http://172.16.250.253:81/documents/2024/Vigilance/Flexible%20Operation%20of%20Coal%20fired%20Power%20plants/Guidelines%20for%20Flexible%20Operation%20of%20Coal%20Fired%20Power%20Plants.pdf", external: true },
  { text: "Cyber Awareness Videos", url: "/cyber-awareness-videos" },
];

const LatestNews = () => {
  const navigate = useNavigate();

  const handleNavigation = (news) => {
    if (news.external) {
      window.open(news.url, "_blank");
    } else {
      navigate(news.url);
    }
  };

  return (
    <div className="news-ticker-container text-dark py-2">
      <div className="news-ticker d-flex align-items-center">
        <strong className="me-3 text-primary">Latest News:</strong>
        <div className="news-scroll">
          <ul className="news-list d-flex">
            {newsLinks.map((news, index) => (
              <li key={index} className="mx-3">
                <span
                  className="text-primary text-decoration-none"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleNavigation(news)}
                >
                  {news.text}
                  <span className="badge bg-danger ms-2">New</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
