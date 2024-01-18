import React from "react";

const ResolutionFilter = ({ selectedResolution, handleResolutionChange }) => {
  return (
    <select
      id="resolution"
      value={selectedResolution}
      onChange={handleResolutionChange}
      style={{
        marginLeft: "1rem",
        backgroundColor: selectedResolution === "All" ? "#fff" : "#263A29",
        color: selectedResolution === "All" ? "#263A29" : "#fff",
        border: "1px solid #263A29",
        borderRadius: "10px",
        padding: "0 1%",
      }}
    >
      <option value="All">All Resolutions</option>
      <option value="1024x768">1024x768 </option>
      <option value="1280x720">1280x720</option>
      <option value="1366x768">1366x768</option>
      <option value="1600x900">1600x900 </option>
    </select>
  );
};

export default ResolutionFilter;
