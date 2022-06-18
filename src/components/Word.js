import React from "react"

// TODO pinyin muotoillaan kauniimpaan muotoon ilman numeroita

const Word = ({word}) => {
  return (
    <tr>
      <td nowrap='nowrap'>
        <h1>{word.hanzi}</h1>
      </td>
      <td nowrap='nowrap'>
        {word.pinyin.map((pinyin, index) => 
          <small key={word+'_pinyin_'+pinyin}>{(index ? ', ' : '') + pinyin}</small>
        )}
      </td>
      <td>{word.definition.finnish} </td>
      <td>{word.definition.english} </td>
      <td>{word.definition.explanation} </td>
      <td>
        {word.tags.map((tag, index) =>
          <small key={word+'_tag_'+tag}>{(index ? ', ' : '') + tag}</small>
        )}
      </td>
    </tr>
  )
}

export default Word