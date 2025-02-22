import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/profile", { withCredentials: true });
        setUser(response.data.user);
      } catch (error) {
        alert("Unauthorized! Redirecting to login.");
        navigate("/signin");
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
    navigate("/signin");
  };

  return (
    <div>
      <h2>Profile</h2>
      {user ? <p>Welcome, {user.username}!</p> : <p>Loading...</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
