const TagSearch = (words, search) => {
  return getWordsByTag(words, search)
}

const getAllTags = (words) => {
  const tags = []
  words.forEach(w => {
    w.tags.forEach(tag => {
      if (!tags.includes(tag)) {
        tags.push(tag)
      }
    });
  });
  return sortTagsByUsage(tags, words)
}

const getWordsByTag = (words, tag) => {
  const results = []
  words.forEach(w => {
    if (w.tags.includes(tag)) {
      results.push(w)
    }
  })
  return results
}

// Tag that has most words associated goes first
// in case of a tie, sort by alphabetical order
const sortTagsByUsage = (list, words) => {
  return list.sort((a, b) => {
    const wordsForTagA = getWordsByTag(words, a)
    const wordsForTagB = getWordsByTag(words, b)
    let comparison = 0
    if (wordsForTagA < wordsForTagB) {
      comparison = 1
    } else if (wordsForTagA > wordsForTagB) {
      comparison = -1
    } else {
      comparison = a.toLowerCase() < b.toLowerCase() ? -1 : 1
    }
    return comparison
  })
}

export {
  TagSearch,
  getAllTags
}