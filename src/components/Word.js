import React from "react"

const Word = ({word, editWord}) => {
  return (
    <tr>
      <td nowrap='nowrap'>
        <div className="hanzi">{word.hanzi}</div>
      </td>
      <td nowrap='nowrap'>
        {word.pinyin.map((pinyin, index) => 
          <small key={word+'_pinyin_'+pinyin}>{(index ? ', ' : '') + pinyin.toLowerCase()}</small>
        )}
      </td>
      <td>{word.definition.finnish} </td>
      <td>{word.definition.english} </td>
      <td><small>{word.definition.explanation} </small></td>
      <td>
        {word.tags.map((tag, index) =>
          <small key={word+'_tag_'+tag}>{(index ? ', ' : '') + tag}</small>
        )}
      </td>
      <td>
        <button type='button' onClick={() => editWord(word.id)}>edit</button>
      </td>
    </tr>
  )
}

export default Word