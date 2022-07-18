import '../styles/NavMenu.css'
import { motion } from 'framer-motion'
import closeNav from '../assets/close-nav.svg'
import home from '../assets/home.svg'
import movie from '../assets/movie.svg'
import tvShow from '../assets/tv-show.svg'
import surprise from '../assets/surprise.svg'
import trending from '../assets/trending.svg'
import tmdb from '../assets/tmdb.svg'
import logoImage from '../assets/logo-image.svg'

function NavMenu() {
    return (
        <div className="nav-page">
            {/* Close navigation button */}
            <div className="close-page">
                <img className="close-page-icon" src={closeNav} alt="Exit navigation icon"/>
            </div>

            {/* Navigation options */}
            <div className="nav-grid">
                <div className="nav-box-icon">
                    <img className="nav-icon home-icon" src={home} alt=""/>
                </div>
                <div className="nav-box">
                    <motion.h3 whileHover={{scale: 1.2, originX: 0}} className="nav-text">HOME</motion.h3>
                </div>
                <div className="nav-box-icon">
                    <img className="nav-icon movie-icon" src={movie} alt=""/>
                </div>
                <div className="nav-box">
                    <motion.h3 whileHover={{scale: 1.2, originX: 0}} className="nav-text">MOVIES</motion.h3>
                </div>
                <div className="nav-box-icon">
                    <img className="nav-icon tv-icon" src={tvShow} alt=""/>
                </div>
                <div className="nav-box">
                    <motion.h3 whileHover={{scale: 1.2, originX: 0}} className="nav-text">TV SHOWS</motion.h3>
                </div>
                <div className="nav-box-icon">
                    <img className="nav-icon surprise-icon" src={surprise} alt=""/>
                </div>
                <div className="nav-box">
                    <motion.h3 whileHover={{scale: 1.2, originX: 0}} className="nav-text">SURPRISE ME</motion.h3>
                </div>
                <div className="nav-box-icon">
                    <img className="nav-icon trending-icon" src={trending} alt=""/>
                </div>
                <div className="nav-box">
                    <motion.h3 whileHover={{scale: 1.2, originX: 0}} className="nav-text">TRENDING</motion.h3>
                </div>
            </div>
            
            {/* Navigation attribution */}
            <div className="attribution">
                <img className="tmdb-logo" src={tmdb} alt="TMDB Logo"/>
                <p className="attribution-text">
                    This product uses TMDB API but is not endorsed or certified by TMDB.
                </p>
            </div>

            {/* Trailer Logo  */}
            <div className="logo-nav">
                    <img className="logo-image-nav" src={logoImage} alt="Trailer Logo"/>
                    <h1 className="logo-title-nav">TRAILER</h1>
            </div>
        </div>
    )
}

export default NavMenu