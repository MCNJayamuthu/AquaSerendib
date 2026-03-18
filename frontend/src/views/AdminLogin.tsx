import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    const response = await fetch("http://localhost:5000/api/admin/login", {

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        username,
        password
      })

    });

    const data = await response.json();

    if (data.token) {

      localStorage.setItem("adminToken", data.token);

      alert("Login successful");

      navigate("/admin/dashboard", { replace: true });
    } else {

      alert(data.message);

    }
  };

  return (

    <div style={{ padding: "40px" }}>

      <h2>Admin Login</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <br/><br/>

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br/><br/>

      <button onClick={handleLogin}>
        Login
      </button>

    </div>
  );
};

export default AdminLogin;