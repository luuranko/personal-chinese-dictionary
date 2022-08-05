import { PinyinSearch } from './PinyinSearch'
import {TagSearch} from './TagSearch'
import { cleanWord } from './ValidationTools'

const SearchResults = (words, pitches, sounds, newSearch, searchType) => {
  const search = cleanWord(newSearch)
  if (search.length === 0) {
    return words
  }
  if (searchType === 'pinyin') {
    return PinyinSearch(words, pitches, sounds, search)
  } else if (searchType === 'hanzi') {
    console.log('Searching by hanzi')
    return words.filter(w => w.hanzi.includes(newSearch))
  } else if (searchType === 'tag') {
    return TagSearch(words, search)
  }
}


export default SearchResults