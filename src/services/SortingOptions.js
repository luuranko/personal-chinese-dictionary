const byId = (words) => {
  return words.sort((a, b) => {
    if (a.id < b.id) {
      return -1
    } else if (a.id > b.id) {
      return 1
    } else {
      return 0
    }
  })
}

const byIdReverse = (words) => {
  return byId(words).reverse()
}

const byPinyinAlphabetical = (words) => {
  return words.sort((a, b) => {
    if (a.pinyin[0] < b.pinyin[0]) {
      return -1
    } else if (a.pinyin[0] > b.pinyin[0]) {
      return 1
    } else {
      return 0
    }
  })
}

const byHanziAlphabetical = (words) => {
  return words.sort((a, b) => {
    if (a.hanzi < b.hanzi) {
      return -1
    } else if (a.hanzi > b.hanzi) {
      return 1
    } else {
      return 0
    }
  })
}

export {
  byId,
  byIdReverse,
  byPinyinAlphabetical,
  byHanziAlphabetical
}