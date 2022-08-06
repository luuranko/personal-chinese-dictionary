import React from "react"

const Word = ({word, editWord}) => {
  return (
    <tr className="results_tr">
      <td className="results_td" nowrap='nowrap'>
        <div className="hanzi">{word.hanzi}</div>
      </td>
      <td className="results_td"  nowrap='nowrap'>
        {word.pinyin.map((pinyin, index) => 
          <small key={word+'_pinyin_'+pinyin}>{(index ? ', ' : '') + pinyin.toLowerCase()}</small>
        )}
      </td>
      <td className="results_td" >{word.definition.finnish} </td>
      <td className="results_td" >{word.definition.english} </td>
      <td className="results_td" ><small>{word.definition.explanation} </small></td>
      <td className="results_td" >
        {word.tags.map((tag, index) =>
          <small key={word+'_tag_'+tag}>{(index ? ' / ' : '') + tag}</small>
        )}
      </td>
      <td className="results_td" >
        <button type='button' onClick={() => editWord(word.id)}>edit</button>
      </td>
    </tr>
  )
}

export default Word