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
  return tags
}

const getWordsByTag = (words, tag) => {
  const results = []
  words.forEach(w => {
    w.tags.forEach(t => {
      if (t == tag) {
        results.push(w)
      }
    });
  })
  return results
}

export {
  TagSearch,
  getAllTags
}