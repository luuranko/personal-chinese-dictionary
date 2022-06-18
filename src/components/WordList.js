import React from "react"
import Word from "./Word"

const WordList = ({words}) => {
  if (words.length > 50) {
    // TODO lyhentää ja näyttää osan?
    return (
      <div>Found {words.length} results, too many to show</div>
    )
  }
  return (
    <div>
      <p>Found {words.length} results</p>
      <table>
        <tbody>
            <tr>
              <th>单词</th>
              <th>拼音</th>
              <th>芬兰语</th>
              <th>英语</th>
              <th>意思</th>
              <th>标签</th>
            </tr>
          {words.map(word =>
            <Word key={word.id} word={word}/>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default WordList