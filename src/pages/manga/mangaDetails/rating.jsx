import React, { useState } from "react";

const Star = ({ selected, onClick }) => (
  <span style={{ cursor: "pointer" }} onClick={onClick}>
    {selected ? "★" : "☆"}
  </span>
);

const Rating = () => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <table>
        <tr
          style={{ marginRight: "5px", fontSize: "35 px", textAlign: "center" }}
        >
          4
        </tr>
        <tr>
          {[1, 2, 3, 4, 5].map((value) => (
            <Star
              key={value}
              selected={value <= rating}
              onClick={() => handleStarClick(value)}
            />
          ))}
        </tr>
      </table>
    </div>
  );
};

export default Rating;
