


import { FaExclamationTriangle, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";

function ErrorCard({ error }) {
  let severity = "low";
  let Icon = FaCheckCircle;

  const text = error.analysis.toLowerCase();
  if (text.includes("critical")) {
    severity = "critical";
    Icon = FaExclamationCircle;
  } else if (text.includes("high")) {
    severity = "high";
    Icon = FaExclamationTriangle;
  } else if (text.includes("medium")) {
    severity = "medium";
    Icon = FaExclamationTriangle;
  }

  return (
    <div className="error-card">
      <div className="error">
        <Icon className="react-icon" />
        {error.error}
        <span className={`badge ${severity}`}>{severity.toUpperCase()}</span>
      </div>
      <div className="analysis">{error.analysis}</div>
    </div>
  );
}

export default ErrorCard;