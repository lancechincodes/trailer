import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react'
import { DataContext } from './DataContext'
import Home from './components/Home'
import Browse from './components/Browse'
import NavMenu from './components/NavMenu'
import Gallery from './components/Gallery'
import Trailer from './components/Trailer'
// import { getTrendingTodayData, getTrendingThisWeekData, getGenreData } from './utils' 

function App() {
  // provides info on current route location
  const location = useLocation() 

  const [trendingToday, setTrendingToday] = useState('')
  const [trendingThisWeek, setTrendingThisWeek] = useState('')
  const [genreArr, setGenreArr] = useState([])

  const imagePath = 'https://image.tmdb.org/t/p/original'
  const searchOptions = {
    key: process.env.REACT_APP_TMDB_KEY,
    api: "https://api.themoviedb.org/3/",
    language: "language=en-US"
  }

  return (
    <div className="App">
      <AnimatePresence>
        <DataContext.Provider value={{searchOptions, imagePath}}>
          <Routes location={location} key={location.key}>
            <Route path="/" element={<Home/>}/>
            <Route 
              path="/browse" 
              element={<Browse
                trendingToday={trendingToday}
                setTrendingToday={setTrendingToday}
                trendingThisWeek={trendingThisWeek}
                setTrendingThisWeek={setTrendingThisWeek}
                genreArr={genreArr}
                setGenreArr={setGenreArr}
              />}
            />
            <Route path="/navigate" element={<NavMenu
              genreArr={genreArr}
              setGenreArr={setGenreArr}
            />}/>
            <Route path="/browse/:genreId" element={<Gallery
              genreArr={genreArr}
              setGenreArr={setGenreArr}
            />}/>
            <Route path="/browse/:genreId/:movieId" element={<Trailer/>}/>
          </Routes>
        </DataContext.Provider>
      </AnimatePresence>
    </div>
  );
}

export default App;