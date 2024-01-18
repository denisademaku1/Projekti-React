import React from "react";
import { Button } from "react-bootstrap";

const Filters = ({ sortBy, handleSortBy }) => {
  return (
    <div className="d-flex align-item-center gap-2">
      <Button
        style={{
          border: "1px solid #263A29",
          backgroundColor: sortBy === "latest" ? "#263A29" : "white",
          color: sortBy === "latest" ? "white" : "#263A29",
        }}
        onClick={() => handleSortBy("latest")}
      >
        Latest
      </Button>
      <Button
        style={{
          border: "1px solid #263A29",
          backgroundColor: sortBy === "most-viewed" ? "#263A29" : "white",
          color: sortBy === "most-viewed" ? "white" : "#263A29",
        }}
        onClick={() => handleSortBy("most-viewed")}
      >
        Most Viewed
      </Button>
      <Button
        style={{
          border: "1px solid #263A29",
          backgroundColor: sortBy === "toplist" ? "#263A29" : "white",
          color: sortBy === "toplist" ? "white" : "#263A29",
        }}
        onClick={() => handleSortBy("toplist")}
      >
        Toplist
      </Button>
    </div>
  );
};

export default Filters;
