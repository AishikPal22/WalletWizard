import React, { useState } from 'react';

import CategoryForm from './CategoryForm';
import './NewCategory.css';

const NewCategory = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [lastUsedId, setLastUsedId] = useState(10);
  
  const saveCategoryDataHandler = (enteredCategoryData) => {
    const newId = lastUsedId + 1;
    const categoryData = {
      ...enteredCategoryData,
      id: newId,
    };
    props.onAddCategory(categoryData);
    console.log(categoryData);
    setLastUsedId(newId);
    setIsEditing(false);
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  return (
    <div className='new-expense'>
      {!isEditing && (
        <button onClick={startEditingHandler}>Add New Category</button>
      )}
      {isEditing && (
        <CategoryForm
          onSaveCategoryData={saveCategoryDataHandler}
          onCancel={stopEditingHandler}
        />
      )}
    </div>
  );
};

export default NewCategory;
