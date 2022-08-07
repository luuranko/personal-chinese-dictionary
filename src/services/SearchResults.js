import { PinyinSearch } from './PinyinSearch'
import {TagSearch} from './TagSearch'
import { cleanWord } from './ValidationTools'
import MeaningSearch from './MeaningSearch'

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
  } else if (searchType === 'meaning') {
    return MeaningSearch(words, search)
  }
}


export default SearchResults