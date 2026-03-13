


// TopErrors.jsx
function TopErrors({ errors }) {
  const frequency = {};
  errors.forEach(e => {
    const key = e.error;
    frequency[key] = (frequency[key] || 0) + 1;
  });

  const sorted = Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div id="topErrors">
      <h2>Top Errors</h2>
      {sorted.length === 0 && <p style={{textAlign:"center", color:"#777"}}>No top errors yet.</p>}
      {sorted.map(([error, count], i) => (
        <div key={i} className="top-error">
          {error} ({count})
        </div>
      ))}
    </div>
  );
}

export default TopErrors;