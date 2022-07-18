import '../styles/Browse.css'
import logoImage from '../assets/logo-image.svg'
import hamburger from '../assets/hamburger.svg'
import search from '../assets/search.svg'
import closeSearch from '../assets/close-search.svg'
import GenreCard from './GenreCard'
import { useContext } from 'react'
import { DataContext } from '../DataContext'
import { Link } from 'react-router-dom'

function Browse({trendingToday, trendingThisWeek, genreArr}) {
    const { imagePath } = useContext(DataContext)

    return(
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
                        placeholder="Search movie, show, or genre"
                    />
                </form>
                <div className="close-search-icon-div"> 
                    <img className="close-search-icon" src={closeSearch} alt="Delete Icon"/>
                </div>
            </div>

            {/* Trending boxes */}
            <p className="browse-section-title">Top movies</p>
            <div className="trending-boxes">
                <div className="trending-box">
                    <h3 className="trending-text">Trending today</h3>
                    <div className="trending-poster-div">
                        <img className="trending-poster" src={imagePath + trendingToday} alt="Top trending poster today"/>
                    </div>
                </div>
                <div className="trending-box">
                    <h3 className="trending-text">Trending this week</h3>
                    <div className="trending-poster-div">
                        <img className="trending-poster" src={imagePath + trendingThisWeek} alt="Top trending poster this week"/>
                    </div>
                </div>
            </div>

            {/* Genre boxes */}
            <p className="browse-section-title">Browse all</p>
            <div className="genre-container">
                {genreArr.map((genre) => (
                    <GenreCard key={genre.id} id={genre.id} name={genre.name}/>
                ))}
                
                <GenreCard/>
            </div>
        </div>
    )
}

export default Browse