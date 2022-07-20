import '../styles/Trailer.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import back from '../assets/back.svg'
import hamburger from '../assets/hamburger.svg'
import playTrailer from '../assets/play-trailer.svg'
import { useEffect, useState, useContext } from 'react'
import { getMovieData, getYoutubeKeyData, getMovieSimilarData } from '../utils'
import { DataContext } from '../DataContext'
import YouTube from 'react-youtube'

function Trailer() {
    const { searchOptions, imagePath } = useContext(DataContext)
    const navigate = useNavigate()
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

    const youtubeUrl = "https://www.youtube.com/watch?v="

    useEffect(() => {
        // get general data about selected movie
        const url = `${searchOptions.api}/movie/${movieId}?api_key=${searchOptions.key}&${searchOptions.language}`
        getMovieData(url, setMovieBackdrop, setMovieTitle, setMoviePoster, setMovieDate, setMovieRating, setMovieTime, setMovieDescription)

        // get youtube key for selected movie 
        const url2 = `${searchOptions.api}/movie/${movieId}/videos?api_key=${searchOptions.key}&${searchOptions.language}`
        getYoutubeKeyData(url2, setTrailerYoutubeKey)

        // get similar movies as selected one
        const url3 = `${searchOptions.api}/movie/${movieId}/similar?api_key=${searchOptions.key}&${searchOptions.language}&page=1`
        getMovieSimilarData(url3, setMovieSimilar)
    },[])

    // console.log(trailerYoutubeKey)
    // console.log(movieSimilar)

    let min = movieTime
    let hour = 0
    while (min > 60) {
        min -= 60
        hour++
    }
    
    function handleBack() {
        navigate(-1)
    }

    const backdropStyles = {
        background: `url(${imagePath}${movieBackdrop}) no-repeat center center`
    }

    return (
        <div className="trailer-page">
            <div className="backdrop-box" style={backdropStyles}>
                <div className="gallery-header trailer">
                    <div onClick={handleBack} className="back">
                        <img className="back-icon" src={back} alt="Back Button"/>
                        <p className="back-text">{movieTitle}</p>
                    </div>
                    <div className="hamburger">
                        <Link to="/navigate">
                            <img className="hamburger-image" src={hamburger} alt="Navigation Button"/>
                        </Link>
                    </div>
                </div>
            </div>
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
                            <p className="tmdb-rating">TMDB: {movieRating}/10</p>
                        </div>
                    </div>
                    <div className="trailer-time">
                        <div className="trailer-button">
                            <img className="playTrailer" src={playTrailer} alt="Play trailer icon"/>
                            <p className="trailer-text">Trailer</p>
                        </div>
                        {hour !== 0 ? (<p className="movie-time">{hour}h {min}m</p>) 
                        : (<p className="movie-time">{min}m</p>)}
                    </div>
                    <div className="description-box">
                        <p className="description-text">{movieDescription}</p>
                    </div>
                </div>
            </div>

            <p className="recommendation-text">You may also like</p>
            <div className="similar-movies">
                {movieSimilar.map((movie) => (
                    <Link to={`/browse/${movie.genre_ids[0]}/${movie.id}`} key={movie.id}>
                        <img className="similar-movie-posters" src={imagePath + movie.poster_path} alt={movie.title}/>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Trailer