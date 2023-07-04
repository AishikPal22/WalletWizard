import React from 'react';
import CategoriesList from './CategoriesList';
import '../Styles.css';

const Categories = (props) => {
  return (
    <div className='categories'>
      <CategoriesList items={props.items} />
    </div>
  );
};

export default Categories;
