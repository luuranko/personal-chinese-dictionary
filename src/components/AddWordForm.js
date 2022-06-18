import React from "react"

const AddWordForm = (props) => {
  const {
    addWord,
    newHanzi, handleNewHanziChange,
    newPinyin, handleNewPinyinChange,
    newMeanings, handleNewMeaningsChange,
    newTags, handleNewTagsChange
  } = props
  return (
    <div>
      <form onSubmit={addWord}>
        <div>
          Hanzi
          <input
            value={newHanzi}
            onChange={handleNewHanziChange}
          />
        </div>
        <div>
          Pinyin
          <input
            value={newPinyin}
            onChange={handleNewPinyinChange}
          />
        </div>
        <div>
          Meanings
          <input
            value={newMeanings}
            onChange={handleNewMeaningsChange}
          />
        </div>
        <div>
          Tags
          <input
            value={newTags}
            onChange={handleNewTagsChange}
          />
        </div>
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default AddWordForm