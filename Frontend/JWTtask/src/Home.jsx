import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h2>Home Page</h2>
      <Link to="/signup">Signup</Link> | <Link to="/signin">Signin</Link>
    </div>
  );
}

export default Home;
