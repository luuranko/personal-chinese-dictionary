import React from "react"

const SearchForm = (props) => {
  const {newSearch, handleNewSearchChange, handleSearchTypeChange} = props
  return (
    <div>
      Search by
      <select
        name="searchtypefield" id="searchtypefield"
        onChange={handleSearchTypeChange}
      >
        <option value="pinyin">pinyin</option>
        <option value="hanzi">hanzi</option>
      </select>
      <input
        value={newSearch}
        onChange={handleNewSearchChange}
      />
      
    </div>
    
  )
}

export default SearchForm