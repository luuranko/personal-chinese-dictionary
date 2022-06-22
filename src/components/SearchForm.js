import React from "react"

const SearchForm = (props) => {
  const {newSearch, handleNewSearchChange, handleSearchTypeChange} = props
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
            Filter by <br></br>
            <select
              name="searchtypefield" id="searchtypefield"
              onChange={handleSearchTypeChange}
            >
              <option value="pinyin">pinyin</option>
              <option value="hanzi">hanzi</option>
            </select>
            </td>
            <td>
            <input
              value={newSearch}
              onChange={handleNewSearchChange}
            />
            </td>
          </tr>
        </tbody>
      </table>
      
    </div>
    
  )
}

export default SearchForm