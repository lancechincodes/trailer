import { useState } from 'react' 

function App() {
  const searchOptions = {
    key: process.env.REACT_APP_TMDB_KEY,
    api: 'https://api.themoviedb.org/3/'
  }

  const [poster, setPoster] = useState('')
  const [backdrop, setBackdrop] = useState('')

  function getData() {
    const url = `${searchOptions.api}search/movie?api_key=${searchOptions.key}&query=morbius`

    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setPoster(res.results[0].backdrop_path)
        setBackdrop(res.results[0].poster_path)
      })
      .catch(err => console.log(err))
  }

  const imagePath = 'https://image.tmdb.org/t/p/w500'

  return (
    <div className="App">
      <button onClick={getData}>Get Jack Reacher Data</button>
      <img src={imagePath + poster} alt="test poster"/>
      <img src={imagePath + backdrop} alt="test backdrop"/>
    </div>
  );
}

export default App;
