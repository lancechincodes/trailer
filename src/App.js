import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';
import Home from './components/Home'
import Browse from './components/Browse'

function App() {
  // provides info on current route location
  const location = useLocation() 
  // const searchOptions = {
  //   key: process.env.REACT_APP_TMDB_KEY,
  //   api: "https://api.themoviedb.org/3/"
  // }

  return (
    <div className="App">
      {/* AnimatePresence is used for exit transitions */}
      <AnimatePresence>
        <Routes location={location} key={location.key}>
          <Route path="/" element={<Home/>}/>
          <Route path="/browse" element={<Browse/>}/>
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;