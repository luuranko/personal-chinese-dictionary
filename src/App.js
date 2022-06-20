import { React, useEffect, useState } from "react";
import axios from 'axios'
import WordList from "./components/WordList";
import { configure } from "@testing-library/react";
// import AddWordForm from "./components/AddWordForm";

const SearchForm = (props) => {
  const {newSearch, handleNewSearchChange, handleSearchTypeChange} = props
  return (
    <div>
      Search
      <input
        value={newSearch}
        onChange={handleNewSearchChange}
      />
      <select
        name="searchtypefield" id="searchtypefield"
        onChange={handleSearchTypeChange}
      >
        <option value="pinyin">pinyin</option>
        <option value="hanzi">hanzi</option>
      </select>
    </div>
    
  )
}

const App = (props) => {
  const [words, setWords] = useState([])
  const [sounds, setSounds] = useState([])
  const [pitches, setPitches] = useState([])
  // const [newHanzi, setNewHanzi] = useState('')
  // const [newPinyin, setNewPinyin] = useState('')
  // const [newMeanings, setNewMeanings] = useState('')
  // const [newTags, setNewTags] = useState('')

  // personal db
  const db = 'http://localhost:3001/'

  // hemiola site db
  // const site = 'http://ccdb.hemiola.com/characters/'
  // const filterPin = 'mandarin/'
  // const filterHan = 'string/'
  
  // const filterB1 = '?filter=gb+!simplifiable&fields=string,kDefinition,kMandarin,kFrequency'

  const [newSearch, setNewSearch] = useState('')

  const [searchType, setNewSearchType] = useState('pinyin')

  // Fetch list of saved words from db.json
  const hookWords = () => {
    axios
      .get(db + 'words')
      .then(response => {
        setWords(response.data)
      })
  }
  useEffect(hookWords, [])

  // Fetch list of valid pinyin without tones from db.json
  const hookSounds = () => {
    axios
      .get(db + 'sounds')
      .then(response => {
        setSounds(response.data)
      })
  }
  useEffect(hookSounds, [])

  // Fetch list of valid pinyin with tones from db.json
  const hookPitches = () => {
    axios
      .get(db + 'pitches')
      .then(response => {
        setPitches(response.data)
      })
  }
  useEffect(hookPitches, [])


  // const addWord = (event) => {
  //   event.preventDefault()


  //   const hanzi = newHanzi.trim()
  //   if (hanzi === '') {
  //     window.alert('Enter valid hanzi')
  //     return
  //   }

  //   const pinyin = newPinyin.trim()
  //   if (pinyin === '') {
  //     window.alert('Enter valid pinyin')
  //     return
  //   }

  //   const meanings = []
  //   newMeanings.split(',').forEach(m => {
  //     m = m.trim()
  //     if (m !== '') {
  //       meanings.push(m)
  //     }
  //   })

  //   const tags = []
  //   newTags.split(',').forEach(t => {
  //     t = t.trim()
  //     if (t !== '') {
  //       tags.push(t)
  //     }
  //   })

  //   const wordObject = {
  //     id: words[words.length - 1].id + 1,
  //     hanzi: hanzi,
  //     pinyin: pinyin,
  //     meanings: meanings,
  //     tags: tags
  //   }
  //   setWords(words.concat(wordObject))
  //   setNewHanzi('')
  //   setNewPinyin('')
  //   setNewMeanings('')
  //   setNewTags('')
  // }

  const handleNewSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const handleSearchTypeChange = (event) => {
    console.log('Changed search type to: ', event.target.value)
    setNewSearchType(event.target.value)
  }

  const results = () => {
    const search = cleanWord(newSearch)
    if (search.length === 0) {
      return words
    }
    if (searchType === 'pinyin') {
      if (validatePinyin(search)) {
        console.log("Searching by pinyin")
        return filterWordsByPinyin(search)
      } else {
        console.log('Incorrect search terms! Check your spelling.')
        return []
      }
    } else if (searchType === 'hanzi') {
      console.log('Searching by hanzi')
      return words.filter(w => w.hanzi.includes(newSearch))
    }
  }

  // Returns the word trimmed and with apostrophes converted to spaces
  const cleanWord = (word) => {
    return word.toUpperCase().trim().split("'").join(' ').trim()
  }

  // Checks if written pinyin is valid
  const validatePinyin = (pinyin) => {
    const search = pinyin.split(" ")
    console.log("Validating search: ", search)
    let valid = true
    search.forEach(p => {
      if (!pitches.includes(p) && !sounds.includes(p)) {
        console.log(p, ' is neither in pitches nor in sounds')
        valid = false
      }
    })
    return valid
  }

  const filterWordsByPinyin = (searchTerm) => {
    const search = searchTerm.split(" ")
    console.log('In filterWordsbyPinyin, search is: ', search)
    const matching = []
    words.forEach(w => {
      let matchingParts = search.length
      for (let i = 0; i < w.pinyin.length; i++) {
        if (search.length > 1) {
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

  const indexInWord = (word, index, searchTerm) => {
    const partsPitch = word.pinyin[index].split(" ")
    const partsSound = word.toneless[index].split(" ")
    const i = partsPitch.indexOf(searchTerm)
    if (i !== -1) {
      return i
    } else {
      return partsSound.indexOf(searchTerm)
    }
  }

  // const handleNewHanziChange = (event) => {
  //   setNewHanzi(event.target.value)
  // }

  // const handleNewPinyinChange = (event) => {
  //   setNewPinyin(event.target.value)
  // }

  // const handleNewMeaningsChange = (event) => {
  //   setNewMeanings(event.target.value)
  // }

  // const handleNewTagsChange = (event) => {
  //   setNewTags(event.target.value)
  // }


  return (
    <div>
      {/* <AddWordForm
        addWord={addWord}
        newHanzi={newHanzi}
        handleNewHanziChange={handleNewHanziChange}
        newPinyin={newPinyin}
        handleNewPinyinChange={handleNewPinyinChange}
        newMeanings={newMeanings}
        handleNewMeaningsChange={handleNewMeaningsChange}
        newTags={newTags}
        handleNewTagsChange={handleNewTagsChange}
      /> */}
      <SearchForm
        newSearch={newSearch}
        handleNewSearchChange={handleNewSearchChange}
        handleSearchTypeChange={handleSearchTypeChange}
      />
      <WordList words={results()} />
    </div>
  );
}

export default App;
