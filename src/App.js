import { React, useEffect, useState } from "react";
import axios from 'axios'
import WordList from "./components/WordList";
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

  // const [shownWords, setShownWords] = useState([])

  const [newSearch, setNewSearch] = useState('')

  const [searchType, setNewSearchType] = useState('pinyin')

  // const hemiola_query = () => {
  //   let s = site
  //   if (searchType == 'pinyin') {
  //     s += filterPin
  //   } else if (searchType == 'hanzi') {
  //     s += filterHan
  //   }
  //   s += newSearch.toUpperCase()
  //   s += filterB1
  //   return s
  // }

  // fetch list of saved words from db.json
  const hookWords = () => {
    axios
      .get(db + 'words')
      .then(response => {
        setWords(response.data)
      })
  }
  useEffect(hookWords, [])

  const hookSounds = () => {
    axios
      .get(db + 'sounds')
      .then(response => {
        setSounds(response.data)
      })
  }
  useEffect(hookSounds, [])

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
    console.log(event.target.value)
    setNewSearchType(event.target.value)
  }

  const filterWordsByPitch = () => {
    const matching = []
    words.forEach(w => {
      // MAGIC HERE
      // remember: a word can have many different pinyin,
      // and one pinyin may have many parts which all must be checked
      if (true) {
        matching.push(w)
      }
    });
    return matching
  }

  const results = () => {
    if (newSearch.length === 0) {
      return words
    }
    if (searchType === 'pinyin') {
      if (pitches.includes(newSearch.toUpperCase())) {
        return filterWordsByPitch()
      } else if (sounds.includes(newSearch.toUpperCase())) {
        return words.filter(w => w.toneless.includes(newSearch))
      } else {
        return words
      }

      
    } else if (searchType === 'hanzi') {
      return words.filter(w => w.hanzi.includes(newSearch))
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
