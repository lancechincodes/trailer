import './App.css';

function App() {
  const searchOptions = {
    key: process.env.REACT_APP_TMDB_KEY,
    api: 'https://api.themoviedb.org/3/'
  }

  function getData() {
    const url = `${searchOptions.api}search/movie?api_key=${searchOptions.key}&query=Jack+Reacher`

    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <button onClick={getData}>Get Jack Reacher Data</button>
    </div>
  );
}

export default App;
