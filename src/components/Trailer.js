import '../styles/Trailer.css'
import back from '../assets/back.svg'
import hamburger from '../assets/hamburger.svg'
import playTrailer from '../assets/play-trailer.svg'
import YouTube from 'react-youtube'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState, useContext, useRef } from 'react'
import { getMovieData, getYoutubeKeyData, getMovieSimilarData } from '../utils'
import { DataContext } from '../DataContext'
import { motion } from 'framer-motion'

function Trailer() {
    const { searchOptions, imagePath } = useContext(DataContext)
    const { movieId } = useParams()
    const [movieBackdrop, setMovieBackdrop] = useState('')
    const [movieTitle, setMovieTitle] = useState('')
    const [moviePoster, setMoviePoster] = useState('')
    const [movieDate, setMovieDate] = useState('')
    const [movieRating, setMovieRating] = useState('')
    const [movieTime, setMovieTime] = useState('')
    const [movieDescription, setMovieDescription] = useState('')
    const [trailerYoutubeKey, setTrailerYoutubeKey] = useState('')
    const [movieSimilar, setMovieSimilar] = useState([])
    const [loadingMovieData, setLoadingMovieData] = useState(true)
    const [loadingYoutubeKeyData, setLoadingYoutubeKeyData] = useState(true)
    const [loadingMovieSimilar, setLoadingMovieSimilar] = useState(true)
    const [showTrailer, setShowTrailer] = useState(false)

    const navigate = useNavigate()
    const trailerVid = useRef()
    const trailerBtnDiv = useRef()
    const trailerBtnText = useRef()
    const trailerBtnSymbol = useRef()

    useEffect(() => {
        // get general data about selected movie
        const url = `${searchOptions.api}/movie/${movieId}?api_key=${searchOptions.key}&${searchOptions.language}`
        getMovieData(url, setMovieBackdrop, setMovieTitle, setMoviePoster, setMovieDate, setMovieRating, setMovieTime, setMovieDescription, setLoadingMovieData)

        // get youtube key for selected movie 
        const url2 = `${searchOptions.api}/movie/${movieId}/videos?api_key=${searchOptions.key}&${searchOptions.language}`
        getYoutubeKeyData(url2, setTrailerYoutubeKey, setLoadingYoutubeKeyData)

        // get similar movies as selected one
        const url3 = `${searchOptions.api}/movie/${movieId}/recommendations?api_key=${searchOptions.key}&${searchOptions.language}&page=1`
        getMovieSimilarData(url3, setMovieSimilar, setLoadingMovieSimilar)
    },[])

    // calculate min and hour from total min
    let min = movieTime
    let hour = 0
    while (min >= 60) {
        min -= 60
        hour++
    }
    
    // navigate to previous page
    function handleBack() {
        navigate(-1)
    }

    const backdropStyles = {
        background: `url(${imagePath}${movieBackdrop}) no-repeat center`,
        backgroundSize: 'cover',
        width: '100%'
    }

    function hideTrailer(event) {
        if (event.target === trailerBtnDiv.current || event.target === trailerBtnText.current || event.target === trailerBtnSymbol.current) {
            return
        }
        else if (event.target !== trailerVid) {
            setShowTrailer(false)
        }
    }

    if (loadingMovieData || loadingYoutubeKeyData || loadingMovieSimilar) {
        return (
            <div className="loading-page">
                <span className="loader"></span>
            </div>
        )
    }

    return (
        <div className="trailer-page" onClick={hideTrailer}>
            
            {/* Backdrop and headings */}
            <div className="backdrop-box" style={backdropStyles}>
                <div className="gallery-header trailer">
                    <div onClick={handleBack} className="back">
                        <motion.img className="back-icon" src={back} alt="Back Button" whileHover={{scale: .9}}/>
                        <p className="back-text">{movieTitle}</p>
                    </div>
                    <div className="hamburger">
                        <Link to="/navigate">
                            <motion.img className="hamburger-image" src={hamburger} alt="Navigation Button" whileHover={{scale: .9, rotate: 180}}/>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="trailer-and-recommendations">
                {/* Trailer and poster/info */}
                {showTrailer ? (
                    <div ref={trailerVid} className="movie-box"> 
                        <YouTube 
                            videoId={trailerYoutubeKey} 
                            className="youtube-box"     
                            opts={{
                                width: "100%",
                                height: "100%"
                            }}
                        />
                    </div>
                ) 
                : (
                    <div className="movie-box"> 
                        <div className="movie-poster-box">
                            <img className="movie-poster" src={imagePath + moviePoster} alt={`${movieTitle} Poster`}/>
                        </div>
                        <div className="description-container">
                            <div className="title-box">
                                <h3 className="title">{movieTitle}</h3>
                            </div>
                            <div className="date-rating-box">
                                <p className="movie-year">{movieDate.substring(0,4)}</p>
                                <div className="tmdb-rating-box">
                                    {movieRating === 0 ? (
                                        <p className="tmdb-rating">| TMDB: NR</p>
                                    ) : (
                                        <p className="tmdb-rating">| TMDB: {+(movieRating*10).toFixed(0)}%</p>
                                    )}
                                </div>
                            </div>
                            <div className="trailer-time">
                                <button 
                                    ref={trailerBtnDiv} 
                                    className="trailer-button" 
                                    onClick={() => setShowTrailer(true)} 
                                >
                                    <img ref={trailerBtnSymbol} className="play-trailer" src={playTrailer} alt="Play trailer icon"/>
                                    <p ref={trailerBtnText} className="trailer-text">Trailer</p>
                                </button>
                                {hour !== 0 ? (<p className="movie-time">{hour}h {min}m</p>) 
                                : (min !== 0 ? (<p className="movie-time">{min}m</p>) 
                                : (<p className="movie-time">Runtime: TBD</p>))}
                            </div>
                            <div className="description-box">
                                <p className="description-text">{movieDescription}</p>
                            </div>
                            <div className="recommendation-container-hide">
                                {movieSimilar.length !== 0 ? <p className="recommendation-text">You may also like</p> : null}
                                <div className="similar-movies">
                                    {movieSimilar.map((movie) => (
                                        <Link className="similar-movie-posters-link" to={`/browse/${movie.genre_ids[0]}/${movie.id}`} key={movie.id}>
                                            <motion.img className="similar-movie-posters" src={imagePath + movie.poster_path} alt={movie.title} whileHover={{scale: .95}}/>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>  
                    </div>
                )}
                {/* Recommendations */}
                <div className="recommendation-container">
                    {movieSimilar.length !== 0 ? <p className="recommendation-text">You may also like</p> : null}
                    <div className="similar-movies">
                        {movieSimilar.map((movie) => (
                            <Link className="similar-movie-posters-link" to={`/browse/${movie.genre_ids[0]}/${movie.id}`} key={movie.id}>
                                <motion.img className="similar-movie-posters" src={imagePath + movie.poster_path} alt={movie.title} whileHover={{scale: .98}}/>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Trailer