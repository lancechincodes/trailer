import '../styles/Trailer.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import back from '../assets/back.svg'
import hamburger from '../assets/hamburger.svg'
import { useEffect, useState, useContext } from 'react'
import { getMovieData, getYoutubeKeyData, getMovieSimilarData } from '../utils'
import { DataContext } from '../DataContext'

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
    const [movieSimilar, setMovieSimilar] = useState('')

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
                <div className="poster-box">
                    <img className="movie-poster" src={imagePath + moviePoster} alt={`${movieTitle} Poster`}/>
                </div>
                <div className="description-box">
                    <div className="title-box">
                        <h3 className="movie-title">{movieTitle}</h3>
                    </div>
                    <div className="date-rating-box">
                        <p className="movie-year">{movieDate.substring(0,4)}</p>
                        <div className="tmdb-rating-box">
                            <img src="" alt="TMDB Logo"/>
                            <p className="tmdb-rating">{movieRating}</p>
                        </div>
                    </div>
                    <div className="trailer-time">
                        <div className="trailer-button">
                            <img src="" alt="Play trailer icon"/>
                            <p>Trailer</p>
                        </div>
                        <div className="time">
                            <p className="movie-time">{movieTime}</p>
                        </div>
                    </div>
                    <div className="description-box">
                        <p>{movieDescription}</p>
                    </div>
                </div>
            </div>

            <p>You may also like</p>
            <div className="similar-movies">
            
            </div>
        </div>
    )
}

export default Trailer