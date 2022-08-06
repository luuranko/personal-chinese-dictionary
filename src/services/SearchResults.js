import { PinyinSearch } from './PinyinSearch'
import {TagSearch} from './TagSearch'
import { cleanWord } from './ValidationTools'

const SearchResults = (initialWords, pitches, sounds, newSearch, searchType, tagSearch) => {
  const words = tagSearch === 'all'? initialWords : TagSearch(initialWords, tagSearch)
  const search = cleanWord(newSearch)
  if (search.length === 0) {
    return words
  }
  if (searchType === 'pinyin') {
    return PinyinSearch(words, pitches, sounds, search)
  } else if (searchType === 'hanzi') {
    return words.filter(w => w.hanzi.includes(newSearch))
  }
}


export default SearchResults