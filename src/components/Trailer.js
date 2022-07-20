import '../styles/Trailer.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import back from '../assets/back.svg'
import hamburger from '../assets/hamburger.svg'
import { useEffect, useState, useContext } from 'react'
import { getMovieData } from '../utils'
import { DataContext } from '../DataContext'

function Trailer() {
    const { searchOptions, imagePath } = useContext(DataContext)
    const navigate = useNavigate()
    const { movieId } = useParams()
    const [movieBackdrop, setMovieBackdrop] = useState('')
    const [movieTitle, setMovieTitle] = useState('')
    const [moviePoster, setMoviePoster] = useState('')
    const [movieDescription, setMovieDescription] = useState('')

    useEffect(() => {
        const url = `${searchOptions.api}/movie/${movieId}?api_key=${searchOptions.key}&${searchOptions.language}`
        getMovieData(url, setMovieBackdrop, setMovieTitle)
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
        </div>
    )
}

export default Trailer