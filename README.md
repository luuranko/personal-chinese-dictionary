# Personal Chinese Dictionary

## Description and goals

This app aims to provide a method of keeping track of the user's learned Mandarin Chinese characters and words. The app will allow the user to
- add new words
- modify previously added words
- categorize words with tags
- look up words by
  - hanzi
  - pinyin
  - translation (Finnish or English) and explanation
  - tags

## Motivation

The motivation for this project was born when I kept looking up Chinese words I thought I hadn't already learnt. This app should make it more convenient for me to rehearse old words when connecting them to a certain category (I certainly will create a tag for terms related to imperial court politics).

## Latest changes

- Words can now be added to the database.
- Correct form of pinyin is validated when adding a word
- Added notification text to inform about problems when adding new words and confirm that a word was successfully added
- On the side added some functions in preparation for implementing the modification of previously added words

## Current functionality

- App displays a list of words saved in the json-file
- User can add words to the database with following attributes:
  - hanzi
  - pinyin(s)
  - finnish translation
  - english translation
  - explanation
  - tag(s)
- App notifies the user of some problems and actions
- User can filter words in the database by character
  - 行 returns 行， 行客， 银行, and so on
- User can filter words by pinyin
  - User can filter words by pinyin both with tone and without
    - "wo" or "wo3" both return words matching "wo3"
  - User can search for long words containing the input pinyin
    - "xing" and "qi" both return words matching "xing qi", but "xi", "xin" or "q" will not
  - User can search for longer words by writing them with spaces or apostrophes separating syllables, or without using spaces or apostrophes if at least each but the last syllable has a tone marker or none have
    - "xing qi tian", "xing'qi'tian", "xing1'qi tian1", "xingqitian", "xing1qi1tian" and "xing1qi1tian1" all return words matching "xing1 qi1 tian1"

## Future features

- Notification disappears after a time and/or can be dismissed by clicking
- User can modify words in the database
- More functionality to searching
  - Smarter filtering by pinyin: search "xingqi1" should return "xing1 qi1", etc.
  - Support for searching with style pīnyīn instead of PIN1YIN1
  - User can search with limited regular expressions
  - User can search by tag
  - User can search by translation and explanation
- Import words from a text file
- Visual improvements
  - Show pinyin in a style like pīnyīn instead of PIN1YIN1
  - Pinyin is shown below the character
- Mass modification options
  - User can change the name of a tag without modifying each word containing it individually
- Choosing tags will be easier: existing tags can be chosen from a multi-choice dropdown list 
- Learning challenges
  - Option to hide translations, explanations and/or pinyin
- Implementing radicals
  - Words display radicals contained within characters of the word
  - User can filter words by radical
- Implementing traditional characters
  - Words display their traditional variant, if available
  - Filtering by hanzi supports traditional characters

## Credits

- Technical skills learned in large parts from [Full Stack open 2022 -course](https://fullstackopen.com/) and [React documentation](https://reactjs.org/)
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- List of sounds and pitches from [Chinese Character Web API](http://ccdb.hemiola.com/), also used as testing material

## Running

In the project directory:
1. `npm run server`
2. `npm start`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

