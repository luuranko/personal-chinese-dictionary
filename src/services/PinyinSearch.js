import { validatePinyin } from "./ValidationTools"

const PinyinSearch = (words, pitches, sounds, search) => {
  if (validatePinyin(pitches, sounds, search)) {
    console.log("Searching by pinyin")
    return filterWordsByPinyin(words, search)
  } else {
    return filterWithSpacelessMultisyllablePinyin(words, search)
  }
}

// Returns list of search results
const filterWordsByPinyin = (words, searchTerm) => {
  const search = searchTerm.split(" ")
  console.log('In filterWordsbyPinyin, search is: ', search)
  const matching = [] // list of search results
  // Leave out words that are shorter than the search term
  const wordsToProcess = words.filter(w => w.hanzi.split("").length >= search.length)
  wordsToProcess.forEach(w => {
    let matchingParts = search.length // when reaches 0, all parts are included
    for (let i = 0; i < w.pinyin.length; i++) {
      if (search.length > 1) {
        // Checks if syllables of the search are in succession within the word
        let startingIndex = indexInWord(w, i, search[0])
        if (startingIndex !== -1) {
          matchingParts--
          for (let j = 1; j < search.length; j++) {
            if (indexInWord(w, i, search[j]) === startingIndex + 1) {
              matchingParts--
              startingIndex++
            }
          }
        }
      } else {
        // Checks if word contains search
        if (indexInWord(w, i, search[0]) !== -1) {
          matchingParts--
        }
      }
    }
    if (matchingParts < 1) {
      matching.push(w)
    }
  });
  return matching
}

const filterWithSpacelessMultisyllablePinyin = (words, pinyin) => {
  const parts = splitPinyinWithoutSpacesBySyllable(pinyin)
  const matching = [] // list of search results
  if (parts.length > 1) {
    // Entä jos syöte on tasoa "hao3meihao"? Korjaa myöhemmin
    return filterWordsByPinyin(words, parts.join(" "))
  } else { // If no tone markers, style "meihao"
    words.forEach(w => {
      for (let i = 0; i < w.pinyin.length; i++) {
        const spacelessPinyin = joinPinyinToSpacelessWithoutTones(w.pinyin[i])
        if (parts[0] === spacelessPinyin) {
          matching.push(w)
          i = w.pinyin.length
        }
      }
    })
  }
  return matching
}

// Checks the word's given pinyin with both tone and without.
// If the search term is one of the syllables in that pinyin,
// returns the index of the syllable. Otherwise returns -1
const indexInWord = (word, index, searchTerm) => {
  const partsPitch = word.pinyin[index].split(" ")
  const i = partsPitch.indexOf(searchTerm)
  if (i !== -1) {
    return i
  } else {
    return partsPitch.map(p => removeToneFromSyllable(p)).indexOf(searchTerm)
  }
}

// Removes the tonal number from a single syllable. Does not work on multisyllable pinyin!
const removeToneFromSyllable = (syllable) => {
  for (let i = 0; i < syllable.length; i++) {
    if (!isNaN(parseInt(syllable.charAt(i)))) {
      return syllable.substring(0, i)
    }
  }
}

const splitPinyinWithoutSpacesBySyllable = (pinyin) => {
  const syllables = []
  let latestSyllableStartIndex = 0
  for (let i = 0; i < pinyin.length; i++) {
    if (!isNaN(parseInt(pinyin.charAt(i)))) {
      syllables.push(pinyin.substring(latestSyllableStartIndex, i+1))
      latestSyllableStartIndex = i + 1
    }
  }
  // If last syllable is toneless, still adds it
  // Also adds the entire pinyin if no tone markers
  if (latestSyllableStartIndex < pinyin.length) {
    syllables.push(pinyin.substring(latestSyllableStartIndex, pinyin.length))
  }
  return syllables
}

// With input "mei3 hao3" returns "meihao"
// Used to check if user's input without spaces or tones matches
// word's form when written in same way
const joinPinyinToSpacelessWithoutTones = (pinyin) => {
  return pinyin.split(" ").map(p => removeToneFromSyllable(p)).join("")
}

export {
  PinyinSearch,
  splitPinyinWithoutSpacesBySyllable
}