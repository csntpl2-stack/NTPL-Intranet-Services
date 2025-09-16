import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Header from './Header2';

const Navbar = ({ user }) => {

    const navigate = useNavigate();

    const Logout = () =>{
        navigate('/')
    }

  return (
    <div>
      <Header />
      <nav
        className="navbar navbar-expand-lg py-3 shadow-sm"
        style={{
          backgroundColor: "#333", // Dark background for contrast
          borderBottom: "1px solid #444", // Slightly lighter border
        }}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Centered Task Manager Title */}
          <div className="d-flex justify-content-center w-100">
            <Link
              className="navbar-brand fw-bold fs-4"
              to="/"
              style={{ color: "#fff",marginLeft:'100px' }} // White text for contrast
            >
              Task Manager
            </Link>
          </div>

          {/* Right side - User's Name and Logout Button */}
          <div
            className="d-flex align-items-center"
            style={{
              whiteSpace: "nowrap", // Ensure user's name stays in a single line
            }}
          >
            {user ? (
              <>
                <p
                  className="navbar-text me-3"
                  style={{
                    color: "#fff",
                    fontWeight: "500",
                    marginTop:'9px' // White text for contrast
                  }}
                >
                  {user.Name}
                </p>
                <button
                  className="btn btn-outline-light rounded-pill d-flex align-items-center"
                  onClick={Logout}
                >
                  <i className="bi bi-box-arrow-right me-2"></i> Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="btn btn-outline-light rounded-pill"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
