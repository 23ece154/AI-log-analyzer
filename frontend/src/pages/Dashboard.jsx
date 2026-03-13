


import { useState } from "react";
import { FaUpload, FaPlay, FaExclamationCircle, FaBug } from "react-icons/fa";
import UploadBox from "../components/UploadBox";
import Stats from "../components/Stats";
import TopErrors from "../components/TopErrors";
import ErrorCard from "../components/ErrorCard";
import "../styles/Dashboard.css";

function Dashboard() {
  const [errors, setErrors] = useState([]);
  const [stats, setStats] = useState({
    totalErrors: 0,
    newErrors: 0,
    duplicateErrors: 0
  });
  const [search, setSearch] = useState("");

  const filteredErrors = errors.filter((e) =>
    e.error.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-wrapper">
      <div className="container">
        <h1><FaBug className="react-icon" /> AI Bug Detector</h1>

        <UploadBox setErrors={setErrors} setStats={setStats} />

        <Stats stats={stats} />

        <TopErrors errors={errors} />

        <h2><FaExclamationCircle className="react-icon" /> AI Insights</h2>

        <input
          id="searchBox"
          type="text"
          placeholder="Search errors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div>
          {filteredErrors.length === 0 && (
            <p style={{ textAlign: "center", color: "#777" }}>
              No errors found.
            </p>
          )}
          {filteredErrors.map((e, i) => (
            <ErrorCard key={i} error={e} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;