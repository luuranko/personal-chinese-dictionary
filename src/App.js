import { React, useEffect, useState } from "react";
import axios from 'axios'
import WordList from "./components/WordList";
import SearchForm from "./components/SearchForm"
import {
  SearchResults,
  validatePinyinHasPitch,
  cleanWord,
  splitPinyinWithoutSpacesBySyllable
} from "./components/SearchResults";
import AddWordForm from "./components/AddWordForm";

const App = () => {
  const [words, setWords] = useState([])
  const [sounds, setSounds] = useState([])
  const [pitches, setPitches] = useState([])

  const [newHanzi, setNewHanzi] = useState('')
  const [newPinyin, setNewPinyin] = useState('')
  const [newFinnish, setNewFinnish] = useState('')
  const [newEnglish, setNewEnglish] = useState('')
  const [newExplain, setNewExplain] = useState('')
  const [newTags, setNewTags] = useState('')

  const [notif, setNotif] = useState('')
  const [isWarning, setIsWarning] = useState(false)

  // personal db
  const db = 'http://localhost:3001/'

  const wordSite = 'http://localhost:3001/words/'

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

  const wordObject = () => {
    let canPost = true
    const hanzi = newHanzi.trim()
    if (hanzi === '') {
      setNotif('Enter valid hanzi')
      setIsWarning(true)
      canPost = false
      return
    }

    if (newPinyin === '') {
      setNotif('Enter valid pinyin')
      setIsWarning(true)
      canPost = false
      return
    }
    const pinyin = []
    newPinyin.split(',').forEach(p => {
      p = cleanWord(p)
      if (validatePinyinHasPitch(pitches, p)) {
        pinyin.push(p)
      } else {
        const parts = splitPinyinWithoutSpacesBySyllable(p)
        let pinyinIsValid = true
        parts.forEach(part => {
          if (!validatePinyinHasPitch(pitches, part)) {
            pinyinIsValid = false
          }
        })
        if (pinyinIsValid) {
          pinyin.push(splitPinyinWithoutSpacesBySyllable(p).join(" "))
        } else {
          setNotif('Enter valid pinyin')
          setIsWarning(true)
          canPost = false
        }
      }
    })

    const finnish = newFinnish.trim()
    const english = newEnglish.trim()
    const explain = newExplain.trim()
    const definition = {
      finnish: finnish,
      english: english,
      explanation: explain
    }

    const tags = []
    newTags.split(',').forEach(t => {
      t = t.trim()
      if (t !== '') {
        tags.push(t)
      }
    })

    const wordObject = {
      hanzi: hanzi,
      pinyin: pinyin,
      definition: definition,
      tags: tags
    }

    if (canPost) {
      return wordObject
    } else {
      return null
    }
  }

  const addWord = (event) => {
    event.preventDefault()
    const word = wordObject()
    if (word !== null) {
      axios
      .post(wordSite, word)
      .then(response => {
        setWords(words.concat(response.data))
        setNewHanzi('')
        setNewPinyin('')
        setNewFinnish('')
        setNewEnglish('')
        setNewExplain('')
        setNewTags('')

        setNotif(`Added ${response.data.hanzi}`)
        setIsWarning(false)
      })
    }
  }

  const modifyWord = id => {
    const word = words.find(w => w.id === id)

    setNewHanzi(word.hanzi)
    setNewPinyin(word.pinyin.join(", "))
    setNewFinnish(word.definition.finnish)
    setNewEnglish(word.definition.english)
    setNewExplain(word.definition.explanation)
    setNewTags(word.tags.join(", "))
  }

  const modifyWordSubmit = id => {

    const wordObject = wordObject()

    if (wordObject !== null) {
      axios
        .put(wordSite + `${id}`, wordObject)
        .then(response => {
          setWords(words.map(w => w.id !== id ? w : response.data))
          setNewHanzi('')
          setNewPinyin('')
          setNewFinnish('')
          setNewEnglish('')
          setNewExplain('')
          setNewTags('')
        })
    }
  }

  const handleNewSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const handleSearchTypeChange = (event) => {
    console.log('Changed search type to: ', event.target.value)
    setNewSearchType(event.target.value)
  }

  const handleNewHanziChange = (event) => {
    setNewHanzi(event.target.value)
  }

  const handleNewPinyinChange = (event) => {
    setNewPinyin(event.target.value)
  }

  const handleNewFinnishChange = (event) => {
    setNewFinnish(event.target.value)
  }

  const handleNewEnglishChange = (event) => {
    setNewEnglish(event.target.value)
  }

  const handleNewExplainChange = (event) => {
    setNewExplain(event.target.value)
  }

  const handleNewTagsChange = (event) => {
    setNewTags(event.target.value)
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
          <td>
          <AddWordForm
            addWord={addWord}
            newHanzi={newHanzi}
            handleNewHanziChange={handleNewHanziChange}
            newPinyin={newPinyin}
            handleNewPinyinChange={handleNewPinyinChange}
            newFinnish={newFinnish}
            handleNewFinnishChange={handleNewFinnishChange}
            newEnglish={newEnglish}
            handleNewEnglishChange={handleNewEnglishChange}
            newExplain={newExplain}
            handleNewExplainChange={handleNewExplainChange}
            newTags={newTags}
            handleNewTagsChange={handleNewTagsChange}
          />
          </td>
          <td>
            <SearchForm
              newSearch={newSearch}
              handleNewSearchChange={handleNewSearchChange}
              handleSearchTypeChange={handleSearchTypeChange}
            />
          </td>
          </tr>
          <tr>
            <td>
              <Notification
                notif={notif}
                isWarning={isWarning}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <WordList words={SearchResults(words, pitches, sounds, newSearch, searchType)} />
    </div>
  );
}

const Notification = (props) => {
  const {notif, isWarning} = props
  if (isWarning) {
    return (
      <div>
        <p className='warning'>
          {notif}
        </p>
      </div>
    )
  }
  return (
    <div>
      <p className='notif'>
        {notif}
      </p>
    </div>
  )
}

export default App;
