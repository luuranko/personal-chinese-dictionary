import {useState, React} from "react"
import Word from "./Word"
import { byId, byIdReverse, byPinyinAlphabetical, byHanziAlphabetical } from "../services/SortingOptions"

const WordList = ({words, editWord}) => {

  const [sortingType, setSortingType] = useState('byIdReverse')

  const handleSortingTypeChange = (event) => {
    setSortingType(event.target.value)
  }

  if (words.length > 50) {
    // TODO page view?
    return (
      <div>Found {words.length} results, too many to show</div>
    )
  }

  // Set sorting for words
  if (sortingType === 'byIdReverse') {
    words = byIdReverse(words)
  } else if (sortingType === 'byId') {
    words = byId(words)
  } else if (sortingType === 'byPinyinAlphabetical') {
    words = byPinyinAlphabetical(words)
  } else if (sortingType === 'byHanziAlphabetical') {
    words = byHanziAlphabetical(words)
  }

  return (
    <div>
      <div>
        Found {words.length} results
      </div>
      <div className='rightAlign'>
        <label
          htmlFor='byIdReverse'
          title='Sort words by descending chronological order.'
        >
          <small>Desc. chronological</small>
        </label>
        <input
          type='radio'
          name='sorting'
          id='byIdReverse'
          value='byIdReverse'
          defaultChecked='true'
          onChange={handleSortingTypeChange}
        ></input>
        <label
          htmlFor='byId'
          title='Sort words by ascending chronological order.'
        >
          <small>Asc. chronological</small>
        </label>
        <input
          type='radio'
          name='sorting'
          id='byId'
          value='byId'
          onChange={handleSortingTypeChange}
        ></input>
        <label
          htmlFor='byPinyinAlphabetical'
          title='Sort words in alphabetical order by their pinyin.'
        >
          <small>By pinyin</small>
        </label>
        <input
          type='radio'
          name='sorting'
          id='byPinyinAlphabetical'
          value='byPinyinAlphabetical'
          onChange={handleSortingTypeChange}
        ></input>
        <label
          htmlFor='byHanziAlphabetical'
          title='Sort words by their hanzi, order determined by order of characters in unicode.'
        >
          <small>By hanzi</small>
        </label>
        <input
          type='radio'
          name='sorting'
          id='byHanziAlphabetical'
          value='byHanziAlphabetical'
          onChange={handleSortingTypeChange}
        ></input>
      </div>
      <br></br><br></br>
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