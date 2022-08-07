import React from "react"

const SearchForm = (props) => {
  const {
    newSearch,
    handleNewSearchChange,
    handleSearchTypeChange,
    tags,
    handleTagSearchChange,
  } = props
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td><small>Filter by tag</small></td>
            <td>
              <select name="tagsearchfield" id="tagsearchfield"
              onChange={handleTagSearchChange}
              >
                <option key="all" value="all"></option>
                {tags.map(tag =>
                  <option key={tag} value={tag}>{tag}</option>  
                )}
              </select>
            </td>
          </tr>
          <tr>
            <td><small>Filter by</small></td>
            <td>
              <select
                name="searchtypefield" id="searchtypefield"
                onChange={handleSearchTypeChange}
              >
                <option value="pinyin">pinyin</option>
                <option value="hanzi">hanzi</option>
                <option value="meaning">meaning</option>
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