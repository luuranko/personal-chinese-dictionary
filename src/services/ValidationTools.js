
// Returns the word trimmed and with apostrophes converted to spaces
const cleanWord = (word) => {
  return word.toUpperCase().trim().split("'").join(' ').trim()
}

// Checks if written pinyin is valid
const validatePinyin = (pitches, sounds, pinyin) => {
  const search = pinyin.split(" ")
  let valid = true
  search.forEach(p => {
    if (!pitches.includes(p) && !sounds.includes(p)) {
      valid = false
    }
  })
  return valid
}

const validatePinyinHasPitch = (pitches, pinyin) => {
  const search = pinyin.split(" ")
  let valid = true
  search.forEach(p => {
    if (!pitches.includes(p)) {
      valid = false
    }
  })
  return valid
}

export {cleanWord, validatePinyin, validatePinyinHasPitch}