import React from "react"

const AddWordForm = (props) => {
  const {
    addWord,
    newHanzi, handleNewHanziChange,
    newPinyin, handleNewPinyinChange,
    newFinnish, handleNewFinnishChange,
    newEnglish, handleNewEnglishChange,
    newExplain, handleNewExplainChange,
    newTags, handleNewTagsChange
  } = props
  return (
    <div>
      <form onSubmit={addWord}>
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
              <td title='Separate tags with a comma'>
                Tags
              </td>
              <td>
                <input
                  value={newTags}
                  onChange={handleNewTagsChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default AddWordForm