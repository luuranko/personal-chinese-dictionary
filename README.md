## Current functionality

- User can search words in the database by character

## TODO

- User can search words by pinyin
  - User can search words by pinyin + tone
  - User can search long words by writing smaller parts of them
  - User can search longer words by writing them with spaces or apostrophes separating characters ("xing qi tian" or "xing'qi'tian")
- User can add words
  - hanzi, pinyin(s), finnish translation, english translation, explanation, tag(s)
- User can modify words in the database
- Import words from text file
- Visual improvements
  - Show pinyin in a style like pīnyīn instead of PIN1YIN1
  - Pinyin is shown below the character

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

