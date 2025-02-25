import React from "react";
import { useNavigate } from "react-router-dom";

function Report() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      {/* Toggle Buttons */}
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => navigate("/dailyreport")}
          style={{
            padding: "10px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Daily Report
        </button>

        <button
          onClick={() => navigate("/custreport")}
          style={{
            padding: "10px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Customer Report
        </button>
      </div>
    </div>
  );
}

export default Report;
