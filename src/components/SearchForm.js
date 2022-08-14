import React from "react"

const SearchForm = (props) => {
  const {
    newSearch,
    handleNewSearchChange,
    handleSearchTypeChange,
    tags,
    handleTagSearchChange,
    changeNameOfTag,
    warn
  } = props

  // Necessary to make React record changes in html elements without State
  function changeInputFieldValue(field, value) {
    let prevValue = field.value
    field.value = value
    let event = new Event('input', { target: field, bubbles: true})
    let tracker = field._valueTracker
    if (tracker) {
      tracker.setValue(prevValue)
    }
    field.dispatchEvent(event)
    return event
  }

  function toggleEditingTag() {
    const toggleEditBtn = document.getElementById('editTagBtn')
    const chosenTag = document.getElementById('tagsearchfield').value
    let display = 'block'
    if (toggleEditBtn.value === 'cancel') {
      display = 'none'
      toggleEditBtn.value = 'edit'
    } else if (toggleEditBtn.value === 'edit' && chosenTag !== 'all') {
      toggleEditBtn.value = 'cancel'
    } else {
      warn("Default tag cannot be edited.")
      return
    }
    const textField = document.getElementById('editTagField')
    const confirmBtn = document.getElementById('tagEditConfirm')
    const deleteBtn = document.getElementById('deleteTagBtn')
    textField.style.display = display
    confirmBtn.style.display = display
    deleteBtn.style.display = display
  }

  // Changes the name of the chosen tag to the given string
  function changeTag() {
    const prevTag = document.getElementById('tagsearchfield').value
    const newTag = document.getElementById('editTagField').value.trim()
    if (prevTag === 'all' || prevTag === '' || newTag === '' || prevTag === newTag) {
      warn(`Cannot change tag ${prevTag} because input is not valid.`)
      return
    }
    changeNameOfTag(prevTag, newTag)
    let event = changeInputFieldValue(document.getElementById('tagsearchfield'), 'all')
    handleTagSearchChange(event)
    changeInputFieldValue(document.getElementById('editTagField'), '')
    toggleEditingTag()
  }

  return (
    <div className='searchForm'>
      <div>
        <label
          htmlFor='tagsearchfield'
          title='Choose a tag to filter results with.'
        >
          Filter by tag
        </label><br></br>
        <select
          name="tagsearchfield"
          id="tagsearchfield"
          onChange={(event) => {
            handleTagSearchChange(event)
            changeInputFieldValue(document.getElementById('editTagField'), event.target.value)
          }}
        >
          <option key="all" value="all"></option>
          {tags.map(tag =>
            <option key={tag} value={tag}>{tag}</option>  
          )}
        </select>
      </div>
      <div>
        <label
          htmlFor='editTagBtn'
          style={{display: 'none'}}
        >
          Rewrite
        </label>
        <input
          type='button'
          id='editTagBtn'
          name='editTagBtn'
          className='button'
          value='edit'
          style={{visibility: 'visible'}}
          onClick={toggleEditingTag}
        />
      </div>
      <div>
        <input
          type='text'
          id='editTagField'
          name='editTagField'
          style={{display: 'none', maxWidth: '80px'}}
        />
      </div>
      <div>
        <button
          type='button'
          id='tagEditConfirm'
          name='tagEditConfirm'
          style={{display: 'none'}}
          onClick={() => {
            changeTag()
          }}
        >
          confirm
        </button>
      </div>
      <div>
        <label
          htmlFor='deleteTagBtn'
          style={{display: 'none'}}
        >
          Delete
        </label>
        <button
          type='button'
          id='deleteTagBtn'
          name='deleteTagBtn'
          style={{display: 'none'}}
          onClick={() => console.log('delete clicked')}
        >
          delete
        </button>
      </div>
    <br></br>
    <br></br>
      <div>
        <label
          htmlFor='searchtypefield'
          title='Choose an attribute to filter with and write the filter words.'
        >
          Filter by
        </label><br></br>
        <select
          name="searchtypefield"
          id="searchtypefield"
          onChange={handleSearchTypeChange}
        >
          <option value="pinyin">pinyin</option>
          <option value="hanzi">hanzi</option>
          <option value="meaning">meaning</option>
        </select>
      </div>
      <div>
        <label
          htmlFor='searchfield'
          style={{display: 'none'}}
        >
          Filter words
        </label>
        <input
          name='searchfield'
          id='searchfield'
          value={newSearch}
          onChange={handleNewSearchChange}
          style={{maxWidth: '100px'}}
        />
      </div>
    </div>
  )
}

export default SearchForm