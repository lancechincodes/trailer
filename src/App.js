import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Browse from './components/Browse'

function App() {
  // const searchOptions = {
  //   key: process.env.REACT_APP_TMDB_KEY,
  //   api: "https://api.themoviedb.org/3/"
  // }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/browse" element={<Browse/>}/>
      </Routes>
    </div>
  );
}

export default App;