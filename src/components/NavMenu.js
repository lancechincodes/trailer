import '../styles/NavMenu.css'
import closeNav from '../assets/close-nav.svg'
import home from '../assets/home.svg'
import movie from '../assets/movie.svg'
import topRated from '../assets/top-rated.svg'
import surprise from '../assets/surprise.svg'
import trending from '../assets/trending.svg'
import tmdb from '../assets/tmdb.svg'
import logoImage from '../assets/logo-image.svg'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { getGenreData, getRandomMovieId } from '../utils'
import { useState, useEffect, useContext  } from 'react'
import { DataContext } from '../DataContext'

function NavMenu({genreArr, setGenreArr}) {
    const navigate = useNavigate()
    const { searchOptions } = useContext(DataContext)
    const [loadingGenre, setLoadingGenre] = useState(true)
    const [randomGenreId, setRandomGenreId] = useState('')
    const [randomMovieId, setRandomMovieId] = useState('')

    function handleBack() {
        // Passing "-1" as a parameter to go back to previous page
        navigate(-1)
    }

    useEffect(() => {
        getGenreData(searchOptions.api, searchOptions.key, searchOptions.language, setGenreArr, setLoadingGenre)
            .then(() => {
                let randomGenreIndex = Math.floor(Math.random() * genreArr.length)
                setRandomGenreId(genreArr[randomGenreIndex].id)
                getRandomMovieId(searchOptions.api, searchOptions.key, searchOptions.language, randomGenreId, setRandomMovieId)
            })
    }, [])

    function handleSurpriseClick() {
        navigate(`/browse/${randomGenreId}/${randomMovieId}`)
    }

    if (loadingGenre) {
        <div className="loading-page">
            <span className="loader"></span>
        </div>
    }

    return (
        <div className="nav-page">
            {/* Close navigation button */}
            <div className="close-page">
                <motion.img onClick={handleBack} className="close-page-icon" src={closeNav} alt="Exit navigation icon" whileHover={{scale: .9}}/>
            </div>

            {/* Navigation options */}
            <div className="nav-grid">
                <div className="nav-box-icon">
                    <img className="nav-icon home-icon" src={home} alt="Home icon"/>
                </div>
                <div className="nav-box">
                    <Link className="nav-link" to="/browse">
                        <motion.h3 whileHover={{scale: 1.1, originX: 0}} className="nav-text">HOME</motion.h3>
                    </Link>
                </div>
                <div className="nav-box-icon">
                    <img className="nav-icon movie-icon" src={movie} alt="Movie icon"/>
                </div>
                <div className="nav-box">
                    <Link className="nav-link" to="/browse/in theatres">
                        <motion.h3 whileHover={{scale: 1.1, originX: 0}} className="nav-text">IN THEATRES</motion.h3>
                    </Link>
                </div>
                <div className="nav-box-icon">
                    <img className="nav-icon trending-icon" src={trending} alt="Trending icon"/>
                </div>
                <div className="nav-box">
                    <Link className="nav-link" to="/browse/trending today">
                        <motion.h3 whileHover={{scale: 1.1, originX: 0}} className="nav-text">TRENDING</motion.h3>
                    </Link>
                </div>
                <div className="nav-box-icon">
                    <img className="nav-icon top-rated-icon" src={topRated} alt="Top rated icon"/>
                </div>
                <div className="nav-box">
                    <Link className="nav-link" to="/browse/top rated">
                        <motion.h3 whileHover={{scale: 1.1, originX: 0}} className="nav-text">TOP RATED</motion.h3>
                    </Link>
                </div>
                <div className="nav-box-icon">
                    <img className="nav-icon surprise-icon" src={surprise} alt="Surprise icon"/>
                </div>
                <div className="nav-box" onClick={handleSurpriseClick}>
                    <motion.h3 whileHover={{scale: 1.1, originX: 0}} className="nav-text">SURPRISE ME</motion.h3>
                </div>
            </div>
            
            <div className="attribution-and-trailer-logo">
                {/* Navigation attribution */}
                <div className="attribution">
                    <img className="tmdb-logo" src={tmdb} alt="TMDB Logo"/>
                    <p className="attribution-text">
                        This product uses TMDB API but is not endorsed or certified by TMDB.
                    </p>
                </div>

                {/* Trailer Logo  */}
                <div className="trailer-lance">
                    <div className="logo-nav">
                            <img className="logo-image-nav" src={logoImage} alt="Trailer Logo"/>
                            <h1 className="logo-title-nav">TRAILER</h1>
                    </div>
                    <div className="developed-by">
                        <p className="lance">Developed by Lance Chin</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavMenu