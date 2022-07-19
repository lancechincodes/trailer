import '../styles/Browse.css'
import '../styles/Loading.css'
import logoImage from '../assets/logo-image.svg'
import hamburger from '../assets/hamburger.svg'
import search from '../assets/search.svg'
import closeSearch from '../assets/close-search.svg'
import GenreCard from './GenreCard'
import { useContext, useState, useEffect } from 'react'
import { DataContext } from '../DataContext'
import { Link } from 'react-router-dom'
import { getTrendingTodayData, getTrendingThisWeekData, getGenreData } from '../utils' 

function Browse({trendingToday, setTrendingToday, trendingThisWeek, setTrendingThisWeek, genreArr, setGenreArr}) {
    const { searchOptions, imagePath } = useContext(DataContext)
    const [loadingToday, setLoadingToday] = useState(true)
    const [loadingWeek, setLoadingWeek] = useState(true)
    const [loadingGenre, setLoadingGenre] = useState(true)

    useEffect(() => {
        getTrendingTodayData(searchOptions.api, searchOptions.key, setTrendingToday, setLoadingToday)
        getTrendingThisWeekData(searchOptions.api, searchOptions.key, setTrendingThisWeek, setLoadingWeek)
        getGenreData(searchOptions.api, searchOptions.key, searchOptions.language, setGenreArr, setLoadingGenre)
      }, [])

    if (loadingToday || loadingWeek || loadingGenre) {
        return (
            <div className="loading-page">
                <span className="loader"></span>
            </div>
        )
    }
    
    return (
        <div className="browse"> 
            {/* Logo and hamburger */}
            <header className="heading-browse">
                <div className="logo-browse">
                    <img className="logo-image-browse" src={logoImage} alt="Trailer Logo"/>
                    <h1 className="logo-title-browse">TRAILER</h1>
                </div>
                <div className="hamburger">
                    <Link to="/navigate">
                        <img className="hamburger-image" src={hamburger} alt="Navigation Button"/>
                    </Link>
                </div>
            </header>

            {/* Input box */}
            <div className="input-box">
                <div className="search-icon-div">
                    <img className="search-icon" src={search} alt="Search Icon"/>
                </div>
                <form type="submit">
                    <input 
                        className="input-text"
                        type="text"
                        placeholder="Search movies"
                    />
                </form>
                <div className="close-search-icon-div"> 
                    <img className="close-search-icon" src={closeSearch} alt="Delete Icon"/>
                </div>
            </div>

            {/* Trending boxes */}
            <p className="browse-section-title">Popular movies</p>
            <div className="trending-boxes">
                    <div className="trending-box">
                        <Link className="trending-link" to="/browse/trending today">
                            <h3 className="trending-text">Trending today</h3>
                            <div className="trending-poster-div">
                                {trendingToday && <img className="trending-poster" src={imagePath + trendingToday} alt="Top trending poster today"/>}
                            </div>
                        </Link>
                    </div>
                    <div className="trending-box">
                        <Link className="trending-link" to="/browse/trending this week">
                            <h3 className="trending-text">Trending this week</h3>
                            <div className="trending-poster-div">
                                {trendingThisWeek && <img className="trending-poster" src={imagePath + trendingThisWeek} alt="Top trending poster this week"/>}
                            </div>
                        </Link>
                    </div>
            </div>

            {/* Genre boxes */}
            <p className="browse-section-title">Browse all</p>
            <div className="genre-container">
                {genreArr.map((genre) => (
                    <GenreCard key={genre.id} id={genre.id} name={genre.name}/>
                ))}                
            </div>
        </div>
    )
}

export default Browse