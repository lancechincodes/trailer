import { useState, useContext, Component } from 'react' 
import { Link, Routes, Route } from 'react-router-dom'
import Home from './components/Home'

function App() {
  const searchOptions = {
    key: process.env.REACT_APP_TMDB_KEY,
    api: "https://api.themoviedb.org/3/"
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
      </Routes>


    </div>
  );
}

export default App;
