import React from 'react';

const CategoryButton = ({ category, onClick }) => {
  return (
    <button onClick={onClick}>
      {category}
    </button>
  );
};

export default CategoryButton;