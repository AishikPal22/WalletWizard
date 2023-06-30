import React from 'react';
import './CategoryItem.css';

const CategoryItem = (props) => {
  return (
    <li>
      <div className='category-item'>
        <div className='category-item__description'>
          <h2>{props.title}</h2>
          <div className='category-item__price'>{props.type}</div>
        </div>
      </div>
    </li>
  );
};

export default CategoryItem;
