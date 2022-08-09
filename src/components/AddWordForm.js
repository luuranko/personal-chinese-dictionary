import React from "react"

const AddWordForm = (props) => {
  const {
    addWord, editWordSubmit, editingId,
    newHanzi, handleNewHanziChange,
    newPinyin, handleNewPinyinChange,
    newFinnish, handleNewFinnishChange,
    newEnglish, handleNewEnglishChange,
    newExplain, handleNewExplainChange,
    newTags, handleNewTagsChange,
    tags,
    cancel
  } = props
  const submitFunction = editingId > -1 ? editWordSubmit : addWord

  // Necessary to make React record the changed tags when using dropdown choice
  function changeInputFieldValue(field, value) {
    let prevValue = field.value
    field.value = prevValue !== '' ? prevValue + ', ' + value : value
    let event = new Event('input', { target: field, bubbles: true})
    let tracker = field._valueTracker
    if (tracker) {
      tracker.setValue(prevValue)
    }
    field.dispatchEvent(event)
  }

  return (
    <div>
      <form onSubmit={submitFunction} autoComplete='off'>
        <table>
          <tbody>
            <tr>
              <td>
                <label
                  htmlFor='hanzi'
                  title='Write a word in hanzi that is not already saved.'
                >
                  Hanzi
                </label>
              </td>
              <td>
                <input
                  type='text'
                  id='hanzi'
                  value={newHanzi}
                  onChange={handleNewHanziChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label
                  htmlFor='pinyin'
                  title='Separate alternative pinyins with a comma'
                >
                  Pinyin
                </label>
              </td>
              <td>
                <input
                  type='text'
                  id='pinyin'
                  value={newPinyin}
                  onChange={handleNewPinyinChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label
                  htmlFor='finnish'
                  title='Write the Finnish translations.'
                >
                  Finnish
                </label>
              </td>
              <td>
                <input
                  type='text'
                  id='finnish'
                  value={newFinnish}
                  onChange={handleNewFinnishChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label
                  htmlFor='english'
                  title='Write the English translations.'
                >
                  English
                </label>
              </td>
              <td>
                <input
                  type='text'
                  id='english'
                  value={newEnglish}
                  onChange={handleNewEnglishChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label
                  htmlFor='explain'
                  title='Add further explanation for the word if needed.'
                >
                  Explanation
                </label>
              </td>
              <td>
                <input
                  type='text'
                  id='explain'
                  value={newExplain}
                  onChange={handleNewExplainChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label
                  htmlFor='tagfield'
                  title='Create new tags by writing or choose existing tags from the list. Separate tags with a comma.'
                >
                  Tags
                </label>
              </td>
              <td>
                <input
                  id="tagfield"
                  value={newTags}
                  onChange={handleNewTagsChange}
                />
              </td>
              <td>
                <select name="tagchoicefield" id="tagchoicefield"
                onChange={()=> {
                  if (document.getElementById("tagchoicefield").value !== 'none'
                      && !document.getElementById("tagfield").value.includes(document.getElementById("tagchoicefield").value)) {
                    changeInputFieldValue(document.getElementById("tagfield"), document.getElementById("tagchoicefield").value + ",")
                  }
                }}
                >
                  <option key="none" value="none"></option>
                  {tags.map(tag =>
                    <option key={tag} value={tag}>{tag}</option>  
                  )}
                </select>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button type='submit'>save</button>
                <button type="button" onClick={() => cancel()}>cancel</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}

export default AddWordForm