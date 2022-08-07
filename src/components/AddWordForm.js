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
  let submitFunction = addWord
  if (editingId > -1) {
    submitFunction = editWordSubmit
  }
  return (
    <div>
      <form onSubmit={submitFunction}>
        <table>
          <tbody>
            <tr>
              <td>Hanzi</td>
              <td>
                <input
                  value={newHanzi}
                  onChange={handleNewHanziChange}
                />
              </td>
            </tr>
            <tr>
              <td title='Separate alternative pinyins with a comma'>
                Pinyin
              </td>
              <td>
                <input
                  value={newPinyin}
                  onChange={handleNewPinyinChange}
                />
              </td>
            </tr>
            <tr>
              <td>Finnish</td>
              <td>
                <input
                  value={newFinnish}
                  onChange={handleNewFinnishChange}
                />
              </td>
            </tr>
            <tr>
              <td>English</td>
              <td>
                <input
                  value={newEnglish}
                  onChange={handleNewEnglishChange}
                />
              </td>
            </tr>
            <tr>
              <td>Explanation</td>
              <td>
                <input
                  value={newExplain}
                  onChange={handleNewExplainChange}
                />
              </td>
            </tr>
            <tr>
              <td title='Create new tags by writing or choose existing tags from the list. Separate tags with a comma.'>
                Tags
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
                    document.getElementById("tagfield").value += document.getElementById("tagchoicefield").value + ', '
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