


import { Link } from "react-router-dom";
import "../styles/Landing.css";

function Landing() {
  return (
    <div className="landing">

      {/* Navbar */}
      <div className="navbar">
        <div className="logo">
          Trace Log
        </div>

        <div className="nav-buttons">
          <Link to="/login">
            <button className="nav-btn">Login</button>
          </Link>

          <Link to="/signup">
            <button className="nav-btn primary">Signup</button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero">

        {/* LEFT CONTENT */}
        <div className="hero-left">

          <h1>
            <span className="highlight"></span> Trace Log 
          </h1>

          <h3 className="tagline">
            Understand your logs and fix errors faster.
          </h3>

          <p>
            TraceAI is an intelligent log analysis platform designed to help
            developers quickly understand complex application logs. Instead
            of manually scanning thousands of log entries, simply upload
            your log files and let AI detect errors, warnings, and unusual
            system patterns instantly.With smart insights and automated 
            debugging assistance, TraceAI highlights critical issues, 
            explains possible causes, and helps you resolve bugs faster 
            — improving development productivity
            and making system monitoring effortless.
          </p>

          <Link to="/signup">
            <button className="primary-btn">
              Get Started →
            </button>
          </Link>

        </div>

        {/* RIGHT IMAGE */}
        <div className="hero-right">
          <img src="/log2.png" alt="AI Log Analysis"/>
        </div>

      </div>

    </div>
  );
}

export default Landing;