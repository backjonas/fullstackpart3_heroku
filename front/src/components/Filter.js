import React from 'react'

const Filter = ({currentFilter, handleFilterChange}) => {
    return (
      <div>
        Filter phonebook
        <input 
          value={currentFilter}
          onChange={handleFilterChange}
        />
      </div>
    )
}

export default Filter