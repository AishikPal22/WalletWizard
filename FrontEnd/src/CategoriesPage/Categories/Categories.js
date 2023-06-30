import React from 'react';
import CategoriesList from './CategoriesList';
import './Categories.css';

const Categories = (props) => {
  return (
    <div className='categories'>
      <CategoriesList items={props.items} />
    </div>
  );
};

export default Categories;
