


import { useState, useRef } from "react";
import { FaUpload, FaPlay } from "react-icons/fa";
import "../styles/Dashboard.css";

function UploadBox({ setErrors, setStats }) {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadLog = async () => {
    if (!file) {
      alert("Please choose a log file");
      return;
    }

    const formData = new FormData();
    formData.append("logfile", file);

    const response = await fetch("https://ai-log-analyzer-mc45.onrender.com/api/logs/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    setStats({
      totalErrors: data.totalErrors,
      newErrors: data.newErrors.length,
      duplicateErrors: data.duplicateErrors.length,
    });

    setErrors([...data.newErrors, ...data.duplicateErrors]);
  };

  return (
    <div className="upload-box">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />

      {/* Upload icon button */}
      <button
        className="primary-btn upload-icon-btn"
        onClick={() => fileInputRef.current.click()}
      >
        <FaUpload style={{ marginRight: "8px" }} /> {file ? file.name : "Upload"}
      </button>

      {/* Analyze button below */}
      <button className="primary-btn analyze-btn" onClick={uploadLog}>
        <FaPlay style={{ marginRight: "8px" }} /> Analyze
      </button>
    </div>
  );
}

export default UploadBox;