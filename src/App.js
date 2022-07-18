import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react'
import { DataContext } from './DataContext'
import Home from './components/Home'
import Browse from './components/Browse'
import NavMenu from './components/NavMenu'

function App() {
  // provides info on current route location
  const location = useLocation() 
  
  // types: movie or show
  const [typeSearch, setTypeSearch] = useState('movie')
  const [trendingToday, setTrendingToday] = useState('')
  const [trendingThisWeek, setTrendingThisWeek] = useState('')
  const [genreArr, setGenreArr] = useState([])
  const imagePath = 'https://image.tmdb.org/t/p/w500'

  useEffect(() => {
    getTrendingTodayData()
    getTrendingThisWeekData()
    getGenreData()
  }, [])

  const searchOptions = {
    key: process.env.REACT_APP_TMDB_KEY,
    api: "https://api.themoviedb.org/3/",
    language: "language=en-US"
  }

  function getTrendingTodayData() {
    const url = `${searchOptions.api}trending/${typeSearch}/day?api_key=${searchOptions.key}`
    fetch(url)
      .then(res => res.json())
      .then(res => {
        setTrendingToday(res.results[0].backdrop_path)
      })
      .catch(err => console.log(err))
  }

  function getTrendingThisWeekData() {
    const url = `${searchOptions.api}trending/${typeSearch}/week?api_key=${searchOptions.key}`
    fetch(url)
      .then(res => res.json())
      .then(res => {
        setTrendingThisWeek(res.results[1].backdrop_path)
      })
      .catch(err => console.log(err))
  }

  function getGenreData() {
    const url = `${searchOptions.api}genre/${typeSearch}/list?api_key=${searchOptions.key}&${searchOptions.language}`
    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setGenreArr(res.genres)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="App">
      {/* AnimatePresence is used for exit transitions */}
      <AnimatePresence>
        <DataContext.Provider value={{searchOptions, typeSearch, imagePath}}>
          <Routes location={location} key={location.key}>
            <Route path="/" element={<Home/>}/>
            <Route 
              path="/browse" 
              element={<Browse
                trendingToday={trendingToday}
                trendingThisWeek={trendingThisWeek}
                genreArr={genreArr}
              />}
            />
            <Route path="/navigate" element={<NavMenu/>}/>
          </Routes>
        </DataContext.Provider>
      </AnimatePresence>
    </div>
  );
}

export default App;