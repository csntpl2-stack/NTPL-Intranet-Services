import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://172.16.250.253:5006";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/gallerylogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      if (data.success) navigate('/circularupload');
    } catch (err) {
      setError("Invalid username or password!");
      console.log(err);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg">
        <h2 className="text-center">Login</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <input 
            type="text" placeholder="Username" className="form-control mb-3"
            value={username} onChange={(e) => setUsername(e.target.value)} required 
          />
          <input 
            type="password" placeholder="Password" className="form-control mb-3"
            value={password} onChange={(e) => setPassword(e.target.value)} required 
          />
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
