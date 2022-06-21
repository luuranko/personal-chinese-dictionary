import { React, useEffect, useState } from "react";
import axios from 'axios'
import WordList from "./components/WordList";
import SearchForm from "./components/SearchForm"
import SearchResults from "./components/SearchResults";
// import AddWordForm from "./components/AddWordForm";

const App = (props) => {
  const [words, setWords] = useState([])
  const [sounds, setSounds] = useState([])
  const [pitches, setPitches] = useState([])
  // const [newHanzi, setNewHanzi] = useState('')
  // const [newPinyin, setNewPinyin] = useState('')
  // const [newFinnish, setNewFinnish] = useState('')
  // const [newEnglish, setNewEnglish] = useState('')
  // const [newExplain, setNewExplain] = useState('')
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

  //   if (pinyin === '') {
  //     window.alert('Enter valid pinyin')
  //     return
  //   }
  //   const pinyin = []
  //   newPinyin.split(',').forEach(p => {
  //     p = p.trim()
  //     if (p !== '') {
  //       pinyin.push(p)
  //     }
  //   })

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
  //     tags: tags
  //   }
  //   setWords(words.concat(wordObject))
  //   setNewHanzi('')
  //   setNewPinyin('')
  //   setNewFinnish('')
  //   setNewEnglish('')
  //   setNewExplain('')
  //   setNewTags('')
  // }

  const handleNewSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const handleSearchTypeChange = (event) => {
    console.log('Changed search type to: ', event.target.value)
    setNewSearchType(event.target.value)
  }

  // const handleNewHanziChange = (event) => {
  //   setNewHanzi(event.target.value)
  // }

  // const handleNewPinyinChange = (event) => {
  //   setNewPinyin(event.target.value)
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
      <WordList words={SearchResults(words, pitches, sounds, newSearch, searchType)} />
    </div>
  );
}

export default App;
