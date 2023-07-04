import React, { useState, useEffect } from 'react';
import '../Styles.css';

const CategoryForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredType, setEnteredType] = useState('');

  useEffect(() => {
    setEnteredType(props.selected);
  }, [props.selected]);
  
  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };
  
  const dropdownChangeHandler = (event) => {
    setEnteredType(event.target.value);
    console.log(event.target.value);
  };
  
  const submitHandler = (event) => {
    event.preventDefault();

    if (!enteredType|| enteredType === '') {
      // Don't add the category if type is not selected
      return;
    }

    const categoryData = {
      title: enteredTitle,
      type: enteredType,
    };

    props.onSaveCategoryData(categoryData);
    setEnteredTitle('');
    setEnteredType('');
  };

  return (
    <form onSubmit={submitHandler}>
      <div class="category-form">
        <div className='form-row'>
          <div>
            <label>Title</label>
            <input
              type='text'
              value={enteredTitle}
              onChange={titleChangeHandler}
            />
          </div>
          <div>
            <label>Type</label>
            <select value={enteredType} onChange={dropdownChangeHandler}>
              <option value=''>Select Type</option>
              <option value='Income'>Income</option>
              <option value='Expense'>Expense</option>
            </select>
          </div>
        </div>
        <div className='button-container'>
          <button type="button" onClick={props.onCancel}>Cancel</button>
          <button type='submit'>Add</button>
        </div>
      </div>
    </form>
  );
};

export default CategoryForm;
