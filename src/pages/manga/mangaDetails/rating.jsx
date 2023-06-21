import React, { useState } from 'react';

const Star = ({ selected, onClick }) => (
  <span style={{ cursor: 'pointer' }} onClick={onClick}>
    {selected ? '★' : '☆'}
  </span>
);

const Rating = () => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          selected={value <= rating}
          onClick={() => handleStarClick(value)}
        />
      ))}
    </div>
  );
};

export default Rating;
