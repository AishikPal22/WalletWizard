import React from 'react';

import '../Styles.css';

const ExpensesFilter = (props) => {
  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'>
        {/* <label>Filter by month</label> */}
        <select value={props.selected} onChange={dropdownChangeHandler}>
          <option value=''>No Month Selected</option>
          <option value='April'>April</option>
          <option value='May'>May</option>
          <option value='June'>June</option>
          <option value='July'>July</option>
          <option value='August'>August</option>
          <option value='September'>September</option>
          <option value='October'>October</option>
          <option value='November'>November</option>
          <option value='Decmeber'>Decmeber</option>
          <option value='January'>January</option>
          <option value='February'>February</option>
          <option value='March'>March</option>
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
