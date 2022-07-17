import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react'
import Home from './components/Home'
import Browse from './components/Browse'

function App() {
  // provides info on current route location
  const location = useLocation() 
  
  // types: movie or show
  const [typeSearch, setTypeSearch] = useState('movie')
  const [trendingToday, setTrendingToday] = useState('')
  const [trendingThisWeek, setTrendingThisWeek] = useState('')

  useEffect(() => {
    getTrendingTodayData()
    getTrendingThisWeekData()
  }, [])

  const searchOptions = {
    key: process.env.REACT_APP_TMDB_KEY,
    api: "https://api.themoviedb.org/3/"
  }

  function getTrendingTodayData() {
    const url = `${searchOptions.api}trending/${typeSearch}/day?api_key=${searchOptions.key}`
    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res)
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

  return (
    <div className="App">
      {/* AnimatePresence is used for exit transitions */}
      <AnimatePresence>
        <Routes location={location} key={location.key}>
          <Route path="/" element={<Home/>}/>
          <Route 
            path="/browse" 
            element={<Browse
              trendingToday={trendingToday}
              trendingThisWeek={trendingThisWeek}
            />}
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;