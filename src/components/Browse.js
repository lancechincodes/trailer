import '../styles/Browse.css'
import '../styles/Loading.css'
import logoImage from '../assets/logo-image.svg'
import hamburger from '../assets/hamburger.svg'
import search from '../assets/search.svg'
import closeSearch from '../assets/close-search.svg'
import GenreCard from './GenreCard'
import { useContext, useState, useEffect } from 'react'
import { DataContext } from '../DataContext'
import { Link, useNavigate } from 'react-router-dom'
import { getTrendingTodayData, getTrendingThisWeekData, getGenreData } from '../utils' 
import { motion } from 'framer-motion'

function Browse({trendingToday, setTrendingToday, trendingThisWeek, setTrendingThisWeek, genreArr, setGenreArr}) {
    const { searchOptions, imagePath } = useContext(DataContext)
    const [loadingToday, setLoadingToday] = useState(true)
    const [loadingWeek, setLoadingWeek] = useState(true)
    const [loadingGenre, setLoadingGenre] = useState(true)
    const [searchString, setSearchString] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        getTrendingTodayData(searchOptions.api, searchOptions.key, setTrendingToday, setLoadingToday)
        getTrendingThisWeekData(searchOptions.api, searchOptions.key, setTrendingThisWeek, setLoadingWeek)
        getGenreData(searchOptions.api, searchOptions.key, searchOptions.language, setGenreArr, setLoadingGenre)
      }, [])

    function handleChange(event) {
        setSearchString(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        if (searchString !== '') {
            navigate(`/browse/search${searchString}`)
        }
    }

    function handleDelete(event) {
        setSearchString('')
    }

    if (loadingToday || loadingWeek || loadingGenre) {
        return (
            <div className="loading-page">
                <span className="loader"></span>
            </div>
        )
    }
    
    return (
        <div className="browse"> 
            <div className="heading-and-input">
                {/* Logo and hamburger */}
                <header className="heading-browse">
                    <div className="logo-browse">
                        <img className="logo-image-browse" src={logoImage} alt="Trailer Logo"/>
                        <h1 className="logo-title-browse">TRAILER</h1>
                    </div>
                    <div className="hamburger">
                        <Link to="/navigate">
                            <motion.img className="hamburger-image" src={hamburger} alt="Navigation Button" whileHover={{scale: .9, rotate: 180}}/>
                        </Link>
                    </div>
                </header>

                {/* Input box */}
                <div className="input-box">
                    <div className="search-icon-div">
                        <img onClick={handleSubmit} className="search-icon" src={search} alt="Search Icon"/>
                    </div>
                    <form type="submit" onSubmit={handleSubmit}>
                        <input 
                            className="input-text"
                            type="text"
                            placeholder="Search movies"
                            value={searchString}
                            onChange={handleChange}
                        />
                    </form>
                    <div className="close-search-icon-div"> 
                        <img onClick={handleDelete} className="close-search-icon" src={closeSearch} alt="Delete Icon"/>
                    </div>
                </div>
            </div>

            {/* Trending boxes */}
            <div className="trending-title-and-boxes">
                <p className="browse-section-title">Popular movies</p>
                <div className="trending-boxes">
                        <motion.div className="trending-box" whileHover={{scale: .98}}>
                            <Link className="trending-link" to="/browse/trending today">
                                <h3 className="trending-text">Trending today</h3>
                                <div className="trending-poster-div">
                                    {trendingToday && <img className="trending-poster" src={imagePath + trendingToday} alt="Top trending poster today"/>}
                                </div>
                            </Link>
                        </motion.div>
                        <motion.div className="trending-box" whileHover={{scale: .98}}>
                            <Link className="trending-link" to="/browse/trending this week">
                                <h3 className="trending-text">Trending this week</h3>
                                <div className="trending-poster-div">
                                    {trendingThisWeek && <img className="trending-poster" src={imagePath + trendingThisWeek} alt="Top trending poster this week"/>}
                                </div>
                            </Link>
                        </motion.div>
                </div>
            </div>

            {/* Genre boxes */}
            <div className="genre-title-and-boxes">
                <p className="browse-section-title">Browse all</p>
                <div className="genre-container">
                    {genreArr.map((genre) => (
                        <GenreCard key={genre.id} id={genre.id} name={genre.name}/>
                    ))}                
                </div>
            </div>
        </div>
    )
}

export default Browse