import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [cpfNo, setCpfNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://172.16.250.253:5006/taskmnglogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cpf_no: cpfNo, password: password }),
      });
      
      const data = await response.json();
      console.log(data)
      
      if (data.success) {
        navigate(`/taskmanager?cpf_no=${cpfNo}`);
      } else {
        setError("Invalid CPF No or Password");
      }
    } catch (error) {
      setError("Error logging in. Please try again.");
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
      <h2 className="text-center mb-4">Task Manager</h2>
        <h2 className="text-center mb-4">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">CPF No:</label>
            <input
              type="text"
              className="form-control"
              value={cpfNo}
              onChange={(e) => setCpfNo(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
