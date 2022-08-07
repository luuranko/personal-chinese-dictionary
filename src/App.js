import { React, useEffect, useState } from "react";
import wordService from './services/words'
import WordList from "./components/WordList";
import SearchForm from "./components/SearchForm"
import Notification from "./components/Notification";
import {
  validatePinyin,
  validatePinyinHasPitch,
  cleanWord
} from "./services/ValidationTools";
import {splitPinyinWithoutSpacesBySyllable} from "./services/PinyinSearch"
import SearchResults from "./services/SearchResults";
import AddWordForm from "./components/AddWordForm";
import { getAllTags } from "./services/TagSearch";

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

  const [editingId, setEditingId] = useState(-1)

  const [newSearch, setNewSearch] = useState('')
  const [searchType, setNewSearchType] = useState('pinyin')
  const [tagSearch, setTagSearch] = useState('all')

  // Fetch list of saved words from db.json
  useEffect(() => {
    wordService
      .getWords()
        .then(initialWords => {
          setWords(initialWords)
      })
  }, [])

  // Fetch list of valid pinyin without tones from db.json
  useEffect(() => {
    wordService
      .getSounds()
        .then(initialSounds => {
          setSounds(initialSounds)
      })
  }, [])

  // Fetch list of valid pinyin with tones from db.json
  useEffect(() => {
    wordService
      .getPitches()
        .then(initialPitches => {
          setPitches(initialPitches)
      })
  }, [])

  const wordObject = () => {
    let canPost = true
    const hanzi = newHanzi.trim()
    if (hanzi === '') {
      warn('Hanzi cannot be empty')
      canPost = false
      return
    }
    if (editingId === -1 && words.find(w => w.hanzi === hanzi)) {
      warn('This word already exists')
      canPost = false
      return
    }
    if (newPinyin === '') {
      warn('Enter valid pinyin')
      canPost = false
      return
    }
    // Validate correct sounds in pinyin
    const pinyin = []
    newPinyin.split(',').forEach(p => {
      p = cleanWord(p)

      // Case: spaces or apostrophes between syllables
      let pinyinIsValid = true
      // The first syllable must have pitch
      const parts = p.split(" ")
      if (!validatePinyinHasPitch(pitches, parts[0])) {
        pinyinIsValid = false
      }
      // the remaining syllables can be pitchless
      for (let i = 1; i < parts.length; i++) {
        if (!validatePinyin(pitches, sounds, parts[i])) {
          pinyinIsValid = false
        }
      }
      // Checks validity and adds, handles other possible case if invalid
      if (pinyinIsValid) {
        pinyin.push(p)
      // Case: no spaces or apostrophes between syllables
      // or input is otherwise invalid
      } else {
        pinyinIsValid = true
        const parts = splitPinyinWithoutSpacesBySyllable(p)
        // All but last syllable must have pitch
        for (let i = 0; i < parts.length - 1; i++) {
          if (!validatePinyinHasPitch(pitches, parts[i])) {
            pinyinIsValid = false
          }
        }

        if (!validatePinyin(pitches, sounds, parts[parts.length - 1])) {
          pinyinIsValid = false
        }
        // Checks validity and adds, shows warning if invalid
        if (pinyinIsValid) {
          pinyin.push(parts.join(" "))
        } else {
          warn('Enter valid pinyin')
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
      if (t !== '' && !tags.includes(t)) {
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

  const notify = (text) => {
    console.log('notifying of ', text)
    setNotif(text)
    setIsWarning(false)
    setTimeout(() => setNotif(''), 5000)
  }

  const warn = (text) => {
    console.log('warning of ', text)
    setNotif(text)
    setIsWarning(true)
    setTimeout(() => setNotif(''), 5000)
  }

  const scrollToTop = () => {
    console.log('scrolling to top')
    window.scrollTo(0,0)
  }

  const addWord = (event) => {
    event.preventDefault()
    const word = wordObject()
    if (!word) {
      console.log('something is wrong. Aborting add')
      return
    }
    wordService
    .create(word)
    .then(returnedWord => {
      setWords(words.concat(returnedWord))
      setNewHanzi('')
      setNewPinyin('')
      setNewFinnish('')
      setNewEnglish('')
      setNewExplain('')
      setNewTags('')
      notify(`Added ${returnedWord.hanzi}`)
    })
    
  }

  const editWord = (id) => {
    setEditingId(id)
    const word = words.find(w => w.id === id)
    notify(`Editing ${word.hanzi}`)
    scrollToTop()

    setNewHanzi(word.hanzi)
    setNewPinyin(word.pinyin.join(", "))
    setNewFinnish(word.definition.finnish)
    setNewEnglish(word.definition.english)
    setNewExplain(word.definition.explanation)
    setNewTags(word.tags.join(", "))
  }

  const cancel = () => {
    if (editingId > -1) {
      setEditingId(-1)
      notify('Cancelled editing.')
    }
    setNewHanzi('')
    setNewPinyin('')
    setNewFinnish('')
    setNewEnglish('')
    setNewExplain('')
    setNewTags('')
  }

  const editWordSubmit = () => {
    const word = wordObject()
    if (!word) {
      console.log('something is wrong. Aborting')
      return
    }
    wordService
      .update(editingId, word)
      .then(returnedWord => {
        setEditingId(-1)
        setWords(words.map(w => w.id !== editingId ? w : returnedWord))
        setNewHanzi('')
        setNewPinyin('')
        setNewFinnish('')
        setNewEnglish('')
        setNewExplain('')
        setNewTags('')
        notify(`Saved changes to ${returnedWord}.`)
      })
  }

  const handleNewSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const handleSearchTypeChange = (event) => {
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

  const handleTagSearchChange = (event) => {
    setTagSearch(event.target.value)
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td colSpan="2">
              <Notification
                notif={notif}
                isWarning={isWarning}
              />
            </td>
          </tr>
          <tr>
            <td>
              <AddWordForm
                addWord={addWord}
                editingId={editingId}
                editWordSubmit={editWordSubmit}
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
                tags={getAllTags(words)}
                cancel={cancel}
              />
            </td>
          <td>
            <SearchForm
              newSearch={newSearch}
              handleNewSearchChange={handleNewSearchChange}
              handleSearchTypeChange={handleSearchTypeChange}
              tags={getAllTags(words)}
              handleTagSearchChange={handleTagSearchChange}
            />
          </td>
          </tr>
        </tbody>
      </table>
      <WordList
        words={SearchResults(words, pitches, sounds, newSearch, searchType, tagSearch)}
        editWord={editWord}
      />
    </div>
  );
}

export default App;
