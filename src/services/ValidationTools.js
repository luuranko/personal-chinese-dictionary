
// Returns the word trimmed and with apostrophes converted to spaces
const cleanWord = (word) => {
  return word.toUpperCase().trim().split("'").join(' ').trim()
}

// Checks that all characters in field hanzi are hanzi in unicode
const validateHanzi = (hanzi) => {
  let valid = true
  
  // Unicode numbers for ranges of CJK sets
  const limit1A = 19968
  const limit1B = 40959
  const limit2A = 13312
  const limit2B = 19903
  const limit3A = 131072
  const limit3B = 173791
  const limit4A = 173824
  const limit4B = 191471
  const limit5A = 196608
  const limit5B = 201551
  for (let i = 0; i < hanzi.length; i++) {
    if(!includedInCJK(hanzi[i], limit1A, limit1B)) {
      if(!includedInCJK(hanzi[i], limit2A, limit2B)) {
        if(!includedInCJK(hanzi[i], limit3A, limit3B)) {
          if(!includedInCJK(hanzi[i], limit4A, limit4B)) {
            if(!includedInCJK(hanzi[i], limit5A, limit5B)) {
              valid = false
            }
          }
        }
      }
    }
  }
  return valid
}

// Checks if hanzi belongs to CJK Unified Ideographs of given set
const includedInCJK = (hanzi, limitA, limitB) => {
  if (hanzi.codePointAt(0) >= limitA && hanzi.codePointAt(0) <= limitB) {
    return true
  }
  return false
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

export {cleanWord, validateHanzi, validatePinyin, validatePinyinHasPitch}