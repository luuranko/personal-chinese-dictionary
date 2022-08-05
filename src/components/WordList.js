import React from "react"
import Word from "./Word"

const WordList = ({words, editWord}) => {
  if (words.length > 50) {
    // TODO page view?
    return (
      <div>Found {words.length} results, too many to show</div>
    )
  }
  return (
    <div>
      <p>Found {words.length} results</p>
      <table className="results">
        <tbody>
            <tr>
              <th className="headerHanzi">汉字</th>
              <th className="headerHanzi">拼音</th>
              <th className="headerHanzi">芬兰语</th>
              <th className="headerHanzi">英语</th>
              <th className="headerHanzi">意思</th>
              <th className="headerHanzi">标签</th>
            </tr>
          {words.map(word =>
            <Word key={word.id} word={word} editWord={editWord}/>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default WordList