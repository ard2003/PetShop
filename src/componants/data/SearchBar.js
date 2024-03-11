import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={handleChange}
      style={{ border: "0", borderRadius: "10px" }}
      onClick={() => navigate("/colection")}
    />
  );
};

export default SearchBar;
