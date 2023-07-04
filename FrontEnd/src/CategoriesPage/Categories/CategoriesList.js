import React from 'react';

import CategoryItem from './CategoryItem';
import '../Styles.css';

const CategoriesList = (props) => {
  console.log(props);
  if (props.items.length === 0) {
    return <h2 className='categories-list__fallback'>Found no categories.</h2>;
  }

  return (
    <ul className='categories-list'>
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
