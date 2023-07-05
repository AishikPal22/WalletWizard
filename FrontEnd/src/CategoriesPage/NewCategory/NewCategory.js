import React, { useState } from 'react';
import CategoryForm from './CategoryForm';
import '../Styles.css';

const NewCategory = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const saveCategoryDataHandler = (enteredCategoryData) => {
    const categoryData = {
      ...enteredCategoryData,
    };
    props.onAddCategory(categoryData);
    console.log(categoryData);
    setIsEditing(false);
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  return (
    <div className='new-category'>
      {!isEditing && (
        <button onClick={startEditingHandler}>Add new Category</button>
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
