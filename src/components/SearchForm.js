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
            <td>
              <label
                htmlFor='tagsearchfield'
                title='Choose a tag to filter results with.'
              >
                Filter by tag
              </label>
              <select
                name="tagsearchfield"
                id="tagsearchfield"
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
            <td>
              <label
                htmlFor='searchtypefield'
                title='Choose an attribute to filter with and write the filter words.'
              >
                Filter by
              </label>
              <select
                name="searchtypefield"
                id="searchtypefield"
                onChange={handleSearchTypeChange}
              >
                <option value="pinyin">pinyin</option>
                <option value="hanzi">hanzi</option>
                <option value="meaning">meaning</option>
              </select>
            </td>
            <td>
              <label
                htmlFor='searchfield'
                className='hidden'
              >
                Filter words
              </label>
              <input
                name='searchfield'
                id='searchfield'
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