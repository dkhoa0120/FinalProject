import React from 'react';
import CategoryButton from '../../pages/manga/mangaDetails/categoryButton';


const MangaCategoryList = ({ categories, onCategorySelect }) => {
  return (
    <div>
      {categories.map((category, index) => (
        <CategoryButton
          key={index}
          category={category}
          onClick={() => onCategorySelect(category)}
        />
      ))}
    </div>
  );
};

export default MangaCategoryList;