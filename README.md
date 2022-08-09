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

## Latest changes

- Added sorting options for words
  - Words can be sorted by chronological orders, by pinyin or by hanzi
- Added a button for scrolling back to top
- Fixed issue with tags chosen from dropdown replacing the existing tags instead of appending to the list.
- Tags are now sorted by how often they are used, most used tags being first in the list

## Current functionality

- App displays a list of words saved in the json-file
- User can add words to the database with following attributes:
  - hanzi
  - pinyin(s)
  - finnish translation
  - english translation
  - explanation
  - tag(s)
- User can edit previously added words *(only on Chrome)*
- User can clear the input fields by pressing cancel
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
- User can filter words by tag
  - User can select tag to filter with from a dropdown menu, but by default no tag is selected and all results will be shown
  - Pinyin and hanzi search still works on top of this
- User can filter words by meaning
  - search term is checked from both Finnish and English translations but not from explanation
- User can view words in different orders (chronological, by pinyin or by hanzi)

## Future features

### User experience improvements
- Notifications can be dismissed by clicking
- More functionality to searching
  - Smarter filtering by pinyin: search "xingqi1" should return "xing1 qi1", etc.
  - Support for searching with style pīnyīn instead of PIN1YIN1
  - User can filter pinyin with limited regular expressions
    - support for OR and wildcard symbols
- Import words from a text file
- Visual improvements
  - Show pinyin in a style like pīnyīn instead of PIN1YIN1
  - Pinyin is shown below the character
- Mass modification options
  - User can change the name of a tag without modifying each word containing it individually
- Implementing radicals
  - Words display radicals contained within characters of the word
  - User can filter words by radical
- Implementing traditional characters
  - Words display their traditional variant, if available
  - Filtering by hanzi supports traditional characters

### Learning tools
- Option to hide translations, explanations, pinyin and tags separately or altogether
- A subtool which displays flashcards based on saved words
  - The tool displays a random word from the selection chosen by user
    - Selection defaults to all saved words, but can be limited by tag
    - Selection is not completely random: words keep track of how often they have been shown, and least often shown and most difficult words are shown more often (more on the specifics below)
  - The flashcard displays at least the hanzi, and depending on user choice, also the pinyin. Correct answer on the other side reveals translations and tags, and pinyin if not already shown.
    - Possible further setting: flashcard shows a word that exists among translations, and the other side displays the hanzi that are translated to that word
  - User has to review how well they knew the word. This statistic is saved and factors into how often the word should be shown.
  - Words that are easy for the user will be lower priority, and each time showing the word will lower the word's priority. Words that were hard for the user will have a higher priority. Thus the priority will change each time the user is shown a word.

## Motivation

The motivation for this project was born when I kept looking up Chinese words I thought I hadn't already learnt. This app should make it more convenient for me to rehearse old words when connecting them to a certain category (I certainly will create a tag for terms related to imperial court politics).

## Credits

- Technical skills learned in large parts from [Full Stack open 2022 -course](https://fullstackopen.com/) and [React documentation](https://reactjs.org/)
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- Lists of Chinese sounds and pitches from [Chinese Character Web API](http://ccdb.hemiola.com/), also used as testing material
- Chinese font from [Chinese Fonts](https://chinesefonts.org/fonts/fzkai-z03-regular)

## Running

In the project directory run `npm run server` and `npm start` in different tabs. 

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

