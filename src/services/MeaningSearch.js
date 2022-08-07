const MeaningSearch = (words, search) => {
  return wordsByFinnishOrEnglish(words, search)
}
const wordsByFinnishOrEnglish = (words, search) => {
  return words.filter(word => {
    if (word.definition.finnish.toUpperCase().includes(search) || word.definition.english.toUpperCase().includes(search)) {
      return word
    }
  })
}

export default MeaningSearch