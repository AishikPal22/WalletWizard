import React from 'react';

import CategoryItem from './CategoryItem';
import './CategoriesList.css';

const CategoriesList = (props) => {
  console.log(props);
  if (props.items.length === 0) {
    return <h2 className='expenses-list__fallback'>Found no categories.</h2>;
  }

  return (
    <ul className='expenses-list'>
      {props.items.map((category) => (
        <CategoryItem
          key={category.id}
          title={category.title}
          type={category.type}
        />
      ))}
    </ul>
  );
};

export default CategoriesList;
