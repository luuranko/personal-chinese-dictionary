import axios from 'axios'

// personal db
const db = 'http://localhost:3001/'
const wordSite = 'http://localhost:3001/words'


const getWords = () => {
  return axios.get(wordSite).then(response => response.data)
}

const getSounds = () => {
  return axios.get(db + 'sounds').then(response => response.data)
}

const getPitches = () => {
  return axios.get(db + 'pitches').then(response => response.data)
}

const getWord = id => {
  return axios
    .get(`${wordSite}/${id}`)
    .then(response => response.data)
    // .catch(error => {
    //   console.log('Unable to get word from ', id)
    // })
}

const create = word => {
  return axios
    .post(wordSite, word)
    .then(response => response.data)
    // .catch(error => {
    //   console.log('Error in adding ', word)
    // })
}

const update = (id, word) => {
  const site = `${wordSite}/${id}`
  console.log(site)
  return axios
    .put(site, word)
    .then(response => {
      console.log(response)
      return response.data
    })
}

export default {
  getWords, getSounds, getPitches, getWord, create, update
}